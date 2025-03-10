import { crawl } from "./lib";

describe("Crawl tests", () => {
  it.concurrent(
    "works",
    async () => {
      await crawl({
        url: "https://spidery.khulnasoft.com",
        limit: 10,
      });
    },
    120000,
  );

  it.concurrent(
    "filters URLs properly",
    async () => {
      const res = await crawl({
        url: "https://spidery.khulnasoft.com/pricing",
        includePaths: ["^/pricing$"],
        limit: 10,
      });

      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.completed).toBe(1);
        expect(res.data[0].metadata.sourceURL).toBe(
          "https://spidery.khulnasoft.com/pricing",
        );
      }
    },
    120000,
  );

  it.concurrent(
    "filters URLs properly when using regexOnFullURL",
    async () => {
      const res = await crawl({
        url: "https://spidery.khulnasoft.com/pricing",
        includePaths: ["^https://(www\\.)?spidery\\.dev/pricing$"],
        regexOnFullURL: true,
        limit: 10,
      });

      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.completed).toBe(1);
        expect(res.data[0].metadata.sourceURL).toBe(
          "https://spidery.khulnasoft.com/pricing",
        );
      }
    },
    120000,
  );

  it.concurrent(
    "discovers URLs properly when origin is not included",
    async () => {
      const res = await crawl({
        url: "https://spidery.khulnasoft.com",
        includePaths: ["^/blog"],
        ignoreSitemap: true,
        limit: 10,
      });

      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.length).toBeGreaterThan(1);
        for (const page of res.data) {
          expect(page.metadata.url ?? page.metadata.sourceURL).toMatch(
            /^https:\/\/(www\.)?spidery\.dev\/blog/,
          );
        }
      }
    },
    120000,
  );
});
