import SpideryApp, { CrawlStatusResponse, ErrorResponse } from 'spidery';

const app = new SpideryApp({apiKey: "fc-YOUR_API_KEY"});

const main = async () => {

  // Scrape a website:
  const scrapeResult = await app.scrapeUrl('spidery.khulnasoft.com');

  if (scrapeResult.success) {
    console.log(scrapeResult.markdown)
  }

  // Crawl a website:
  const crawlResult = await app.crawlUrl('khulnasoft.com', { excludePaths: ['blog/*'], limit: 5});
  console.log(crawlResult);

  // Asynchronously crawl a website:
  const asyncCrawlResult = await app.asyncCrawlUrl('khulnasoft.com', { excludePaths: ['blog/*'], limit: 5});
  
  if (asyncCrawlResult.success) {
    const id = asyncCrawlResult.id;
    console.log(id);

    let checkStatus: CrawlStatusResponse | ErrorResponse;
    if (asyncCrawlResult.success) {
      while (true) {
        checkStatus = await app.checkCrawlStatus(id);
        if (checkStatus.success && checkStatus.status === 'completed') {
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second
      }

      if (checkStatus.success && checkStatus.data) {
        console.log(checkStatus.data[0].markdown);
      }
    }
  }

  // Map a website:
  const mapResult = await app.mapUrl('https://spidery.khulnasoft.com');
  console.log(mapResult)

  // // Extract information from a website using LLM:
  // const extractSchema = z.object({
  //   title: z.string(),
  //   description: z.string(),
  //   links: z.array(z.string())
  // });

  // const extractResult = await app.extractUrls(['https://spidery.khulnasoft.com'], {
  //   prompt: "Extract the title, description, and links from the website",
  //   schema: extractSchema
  // });
  // console.log(extractResult);

  // Crawl a website with WebSockets:
  const watch = await app.crawlUrlAndWatch('khulnasoft.com', { excludePaths: ['blog/*'], limit: 5});

  watch.addEventListener("document", doc => {
    console.log("DOC", doc.detail);
  });

  watch.addEventListener("error", err => {
    console.error("ERR", err.detail.error);
  });

  watch.addEventListener("done", state => {
    console.log("DONE", state.detail.status);
  });
}

main()