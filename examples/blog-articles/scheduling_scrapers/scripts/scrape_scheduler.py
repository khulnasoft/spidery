import schedule
import time
from spidery_scraper import save_spidery_news_data

# Schedule the scraper to run every hour
schedule.every().hour.do(save_spidery_news_data)

while True:
    schedule.run_pending()
    time.sleep(1)
