import { supabase_service } from "../supabase";
import { withAuth } from "../../lib/withAuth";
import { Resend } from "resend";
import { NotificationType } from "../../types";
import { logger } from "../../../src/lib/logger";
import { sendSlackWebhook } from "../alerts/slack";
import { getNotificationString } from "./notification_string";
import { AuthCreditUsageChunk } from "../../controllers/v1/types";
import { redlock } from "../redlock";

const emailTemplates: Record<
  NotificationType,
  { subject: string; html: string }
> = {
  [NotificationType.APPROACHING_LIMIT]: {
    subject: "You've used 80% of your credit limit - Spidery",
    html: "Hey there,<br/><p>You are approaching your credit limit for this billing period. Your usage right now is around 80% of your total credit limit. Consider upgrading your plan to avoid hitting the limit. Check out our <a href='https://spidery.khulnasoft.com/pricing'>pricing page</a> for more info.</p><br/>Thanks,<br/>Spidery Team<br/>",
  },
  [NotificationType.LIMIT_REACHED]: {
    subject: "Credit Limit Reached! Take action now to resume usage - Spidery",
    html: "Hey there,<br/><p>You have reached your credit limit for this billing period. To resume usage, please upgrade your plan. Check out our <a href='https://spidery.khulnasoft.com/pricing'>pricing page</a> for more info.</p><br/>Thanks,<br/>Spidery Team<br/>",
  },
  [NotificationType.RATE_LIMIT_REACHED]: {
    subject: "Rate Limit Reached - Spidery",
    html: "Hey there,<br/><p>You've hit one of the Spidery endpoint's rate limit! Take a breather and try again in a few moments. If you need higher rate limits, consider upgrading your plan. Check out our <a href='https://spidery.khulnasoft.com/pricing'>pricing page</a> for more info.</p><p>If you have any questions, feel free to reach out to us at <a href='mailto:help@spidery.com'>help@spidery.com</a></p><br/>Thanks,<br/>Spidery Team<br/><br/>Ps. this email is only sent once every 7 days if you reach a rate limit.",
  },
  [NotificationType.AUTO_RECHARGE_SUCCESS]: {
    subject: "Auto recharge successful - Spidery",
    html: "Hey there,<br/><p>Your account was successfully recharged with 1000 credits because your remaining credits were below the threshold. Consider upgrading your plan at <a href='https://spidery.khulnasoft.com/pricing'>spidery.khulnasoft.com/pricing</a> to avoid hitting the limit.</p><br/>Thanks,<br/>Spidery Team<br/>",
  },
  [NotificationType.AUTO_RECHARGE_FAILED]: {
    subject: "Auto recharge failed - Spidery",
    html: "Hey there,<br/><p>Your auto recharge failed. Please try again manually. If the issue persists, please reach out to us at <a href='mailto:help@spidery.com'>help@spidery.com</a></p><br/>Thanks,<br/>Spidery Team<br/>",
  },
};

export async function sendNotification(
  team_id: string,
  notificationType: NotificationType,
  startDateString: string | null,
  endDateString: string | null,
  chunk: AuthCreditUsageChunk,
  bypassRecentChecks: boolean = false,
) {
  return withAuth(sendNotificationInternal, undefined)(
    team_id,
    notificationType,
    startDateString,
    endDateString,
    chunk,
    bypassRecentChecks,
  );
}

export async function sendEmailNotification(
  email: string,
  notificationType: NotificationType,
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Spidery <spidery@khulnasoft.com>",
      to: [email],
      reply_to: "help@spidery.com",
      subject: emailTemplates[notificationType].subject,
      html: emailTemplates[notificationType].html,
    });

    if (error) {
      logger.debug(`Error sending email: ${error}`);
      return { success: false };
    }
  } catch (error) {
    logger.debug(`Error sending email (2): ${error}`);
    return { success: false };
  }
}

export async function sendNotificationInternal(
  team_id: string,
  notificationType: NotificationType,
  startDateString: string | null,
  endDateString: string | null,
  chunk: AuthCreditUsageChunk,
  bypassRecentChecks: boolean = false,
): Promise<{ success: boolean }> {
  if (team_id === "preview" || team_id.startsWith("preview_")) {
    return { success: true };
  }
  return await redlock.using(
    [`notification-lock:${team_id}:${notificationType}`],
    5000,
    async () => {
      if (!bypassRecentChecks) {
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

        const { data, error } = await supabase_service
          .from("user_notifications")
          .select("*")
          .eq("team_id", team_id)
          .eq("notification_type", notificationType)
          .gte("sent_date", fifteenDaysAgo.toISOString());

        if (error) {
          logger.debug(`Error fetching notifications: ${error}`);
          return { success: false };
        }

        if (data.length !== 0) {
          return { success: false };
        }

        // TODO: observation: Free credits people are not receiving notifications

        const { data: recentData, error: recentError } = await supabase_service
          .from("user_notifications")
          .select("*")
          .eq("team_id", team_id)
          .eq("notification_type", notificationType)
          .gte("sent_date", startDateString)
          .lte("sent_date", endDateString);

        if (recentError) {
          logger.debug(
            `Error fetching recent notifications: ${recentError.message}`,
          );
          return { success: false };
        }

        if (recentData.length !== 0) {
          return { success: false };
        }
      }

      console.log(
        `Sending notification for team_id: ${team_id} and notificationType: ${notificationType}`,
      );
      // get the emails from the user with the team_id
      const { data: emails, error: emailsError } = await supabase_service
        .from("users")
        .select("email")
        .eq("team_id", team_id);

      if (emailsError) {
        logger.debug(`Error fetching emails: ${emailsError}`);
        return { success: false };
      }

      for (const email of emails) {
        await sendEmailNotification(email.email, notificationType);
      }

      const { error: insertError } = await supabase_service
        .from("user_notifications")
        .insert([
          {
            team_id: team_id,
            notification_type: notificationType,
            sent_date: new Date().toISOString(),
            timestamp: new Date().toISOString(),
          },
        ]);

      if (process.env.SLACK_ADMIN_WEBHOOK_URL && emails.length > 0) {
        sendSlackWebhook(
          `${getNotificationString(notificationType)}: Team ${team_id}, with email ${emails[0].email}. Number of credits used: ${chunk.adjusted_credits_used} | Number of credits in the plan: ${chunk.price_credits}`,
          false,
          process.env.SLACK_ADMIN_WEBHOOK_URL,
        ).catch((error) => {
          logger.debug(`Error sending slack notification: ${error}`);
        });
      }

      if (insertError) {
        logger.debug(`Error inserting notification record: ${insertError}`);
        return { success: false };
      }

      return { success: true };
    },
  );
}
