<h3 align="center">
  <a name="readme-top"></a>
  <img
    src="https://raw.githubusercontent.com/khulnasoft/spidery/main/img/spidery_logo.png"
    height="200"
  >
</h3>
<div align="center">
    <a href="https://github.com/khulnasoft/spidery/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/khulnasoft/spidery" alt="License">
</a>
    <a href="https://pepy.tech/project/spidery-py">
  <img src="https://static.pepy.tech/badge/spidery-py" alt="Downloads">
</a>
<a href="https://GitHub.com/khulnasoft/spidery/graphs/contributors">
  <img src="https://img.shields.io/github/contributors/khulnasoft/spidery.svg" alt="GitHub Contributors">
</a>
<a href="https://spidery.khulnasoft.com">
  <img src="https://img.shields.io/badge/Visit-spidery.khulnasoft.com-orange" alt="Visit spidery.khulnasoft.com">
</a>
</div>
<div>
  <p align="center">
    <a href="https://twitter.com/spidery_dev">
      <img src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" />
    </a>
    <a href="https://www.linkedin.com/company/104100957">
      <img src="https://img.shields.io/badge/Follow%20on%20LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Follow on LinkedIn" />
    </a>
    <a href="https://discord.com/invite/gSmWdAkdwd">
      <img src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join our Discord" />
    </a>
  </p>
</div>

# 🔥 Spidery

Empower your AI apps with clean data from any website. Featuring advanced scraping, crawling, and data extraction capabilities.

_This repository is in development, and we’re still integrating custom modules into the mono repo. It's not fully ready for self-hosted deployment yet, but you can run it locally._

## What is Spidery?

[Spidery](https://spidery.khulnasoft.com?ref=github) is an API service that takes a URL, crawls it, and converts it into clean markdown or structured data. We crawl all accessible subpages and give you clean data for each. No sitemap required. Check out our [documentation](https://docs.spidery.khulnasoft.com).

_Pst. hey, you, join our stargazers :)_

<a href="https://github.com/khulnasoft/spidery">
  <img src="https://img.shields.io/github/stars/khulnasoft/spidery.svg?style=social&label=Star&maxAge=2592000" alt="GitHub stars">
</a>

## How to use it?

We provide an easy to use API with our hosted version. You can find the playground and documentation [here](https://spidery.khulnasoft.com/playground). You can also self host the backend if you'd like.

Check out the following resources to get started:
- [x] **API**: [Documentation](https://docs.spidery.khulnasoft.com/api-reference/introduction)
- [x] **SDKs**: [Python](https://docs.spidery.khulnasoft.com/sdks/python), [Node](https://docs.spidery.khulnasoft.com/sdks/node), [Go](https://docs.spidery.khulnasoft.com/sdks/go), [Rust](https://docs.spidery.khulnasoft.com/sdks/rust)
- [x] **LLM Frameworks**: [Langchain (python)](https://python.langchain.com/docs/integrations/document_loaders/spidery/), [Langchain (js)](https://js.langchain.com/docs/integrations/document_loaders/web_loaders/spidery), [Llama Index](https://docs.llamaindex.ai/en/latest/examples/data_connectors/WebPageDemo/#using-spidery-reader), [Crew.ai](https://docs.crewai.com/), [Composio](https://composio.dev/tools/spidery/all), [PraisonAI](https://docs.praison.ai/spidery/), [Superinterface](https://superinterface.ai/docs/assistants/functions/spidery), [Vectorize](https://docs.vectorize.io/integrations/source-connectors/spidery)
- [x] **Low-code Frameworks**: [Dify](https://dify.ai/blog/dify-ai-blog-integrated-with-spidery), [Langflow](https://docs.langflow.org/), [Flowise AI](https://docs.flowiseai.com/integrations/langchain/document-loaders/spidery), [Cargo](https://docs.getcargo.io/integration/spidery), [Pipedream](https://pipedream.com/apps/spidery/)
- [x] **Others**: [Zapier](https://zapier.com/apps/spidery/integrations), [Pabbly Connect](https://www.pabbly.com/connect/integrations/spidery/)
- [ ] Want an SDK or Integration? Let us know by opening an issue.

To run locally, refer to guide [here](https://github.com/khulnasoft/spidery/blob/main/CONTRIBUTING.md).

### API Key

To use the API, you need to sign up on [Spidery](https://spidery.khulnasoft.com) and get an API key.

### Features

- [**Scrape**](#scraping): scrapes a URL and get its content in LLM-ready format (markdown, structured data via [LLM Extract](#llm-extraction-beta), screenshot, html)
- [**Crawl**](#crawling): scrapes all the URLs of a web page and return content in LLM-ready format
- [**Map**](#map-alpha): input a website and get all the website urls - extremely fast
- [**Extract**](#extract): get structured data from single page, multiple pages or entire websites with AI.

### Powerful Capabilities
- **LLM-ready formats**: markdown, structured data, screenshot, HTML, links, metadata
- **The hard stuff**: proxies, anti-bot mechanisms, dynamic content (js-rendered), output parsing, orchestration
- **Customizability**: exclude tags, crawl behind auth walls with custom headers, max crawl depth, etc...
- **Media parsing**: pdfs, docx, images
- **Reliability first**: designed to get the data you need - no matter how hard it is
- **Actions**: click, scroll, input, wait and more before extracting data
- **Batching (New)**: scrape thousands of URLs at the same time with a new async endpoint.

You can find all of Spidery's capabilities and how to use them in our [documentation](https://docs.spidery.khulnasoft.com)

### Crawling

Used to crawl a URL and all accessible subpages. This submits a crawl job and returns a job ID to check the status of the crawl.

```bash
curl -X POST https://api.spidery.khulnasoft.com/v1/crawl \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer fc-YOUR_API_KEY' \
    -d '{
      "url": "https://docs.spidery.khulnasoft.com",
      "limit": 100,
      "scrapeOptions": {
        "formats": ["markdown", "html"]
      }
    }'
```

Returns a crawl job id and the url to check the status of the crawl.

```json
{
  "success": true,
  "id": "123-456-789",
  "url": "https://api.spidery.khulnasoft.com/v1/crawl/123-456-789"
}
```

### Check Crawl Job

Used to check the status of a crawl job and get its result.

```bash
curl -X GET https://api.spidery.khulnasoft.com/v1/crawl/123-456-789 \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

```json
{
  "status": "completed",
  "total": 36,
  "creditsUsed": 36,
  "expiresAt": "2024-00-00T00:00:00.000Z",
  "data": [
    {
      "markdown": "[Spidery Docs home page![light logo](https://mintlify.s3-us-west-1.amazonaws.com/spidery/logo/light.svg)!...",
      "html": "<!DOCTYPE html><html lang=\"en\" class=\"js-focus-visible lg:[--scroll-mt:9.5rem]\" data-js-focus-visible=\"\">...",
      "metadata": {
        "title": "Build a 'Chat with website' using Groq Llama 3 | Spidery",
        "language": "en",
        "sourceURL": "https://docs.spidery.khulnasoft.com/learn/rag-llama3",
        "description": "Learn how to use Spidery, Groq Llama 3, and Langchain to build a 'Chat with your website' bot.",
        "ogLocaleAlternate": [],
        "statusCode": 200
      }
    }
  ]
}
```

### Scraping

Used to scrape a URL and get its content in the specified formats.

```bash
curl -X POST https://api.spidery.khulnasoft.com/v1/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://docs.spidery.khulnasoft.com",
      "formats" : ["markdown", "html"]
    }'
```

Response:

```json
{
  "success": true,
  "data": {
    "markdown": "Launch Week I is here! [See our Day 2 Release 🚀](https://www.spidery.khulnasoft.com/blog/launch-week-i-day-2-doubled-rate-limits)[💥 Get 2 months free...",
    "html": "<!DOCTYPE html><html lang=\"en\" class=\"light\" style=\"color-scheme: light;\"><body class=\"__variable_36bd41 __variable_d7dc5d font-inter ...",
    "metadata": {
      "title": "Home - Spidery",
      "description": "Spidery crawls and converts any website into clean markdown.",
      "language": "en",
      "keywords": "Spidery,Markdown,Data,Khulnasoft,Langchain",
      "robots": "follow, index",
      "ogTitle": "Spidery",
      "ogDescription": "Turn any website into LLM-ready data.",
      "ogUrl": "https://www.spidery.khulnasoft.com/",
      "ogImage": "https://www.spidery.khulnasoft.com/og.png?123",
      "ogLocaleAlternate": [],
      "ogSiteName": "Spidery",
      "sourceURL": "https://spidery.khulnasoft.com",
      "statusCode": 200
    }
  }
}
```

### Map (Alpha)

Used to map a URL and get urls of the website. This returns most links present on the website.

```bash cURL
curl -X POST https://api.spidery.khulnasoft.com/v1/map \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://spidery.khulnasoft.com"
    }'
```

Response:

```json
{
  "status": "success",
  "links": [
    "https://spidery.khulnasoft.com",
    "https://www.spidery.khulnasoft.com/pricing",
    "https://www.spidery.khulnasoft.com/blog",
    "https://www.spidery.khulnasoft.com/playground",
    "https://www.spidery.khulnasoft.com/smart-crawl",
  ]
}
```

#### Map with search

Map with `search` param allows you to search for specific urls inside a website.

```bash cURL
curl -X POST https://api.spidery.khulnasoft.com/v1/map \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://spidery.khulnasoft.com",
      "search": "docs"
    }'
```

Response will be an ordered list from the most relevant to the least relevant.

```json
{
  "status": "success",
  "links": [
    "https://docs.spidery.khulnasoft.com",
    "https://docs.spidery.khulnasoft.com/sdks/python",
    "https://docs.spidery.khulnasoft.com/learn/rag-llama3",
  ]
}
```

### Extract

Get structured data from entire websites with a prompt and/or a schema.

You can extract structured data from one or multiple URLs, including wildcards:

Single Page:
Example: https://spidery.khulnasoft.com/some-page

Multiple Pages / Full Domain
Example: https://spidery.khulnasoft.com/*

When you use /*, Spidery will automatically crawl and parse all URLs it can discover in that domain, then extract the requested data.

```bash
curl -X POST https://api.spidery.khulnasoft.com/v1/extract \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "urls": [
        "https://spidery.khulnasoft.com/*", 
        "https://docs.spidery.khulnasoft.com/", 
        "https://www.ycombinator.com/companies"
      ],
      "prompt": "Extract the company mission, whether it is open source, and whether it is in Y Combinator from the page.",
      "schema": {
        "type": "object",
        "properties": {
          "company_mission": {
            "type": "string"
          },
          "is_open_source": {
            "type": "boolean"
          },
          "is_in_yc": {
            "type": "boolean"
          }
        },
        "required": [
          "company_mission",
          "supports_sso",
          "is_open_source",
          "is_in_yc"
        ]
      }
    }'
```

```json
{
  "success": true,
  "id": "44aa536d-f1cb-4706-ab87-ed0386685740",
  "urlTrace": []
}
```

If you are using the sdks, it will auto pull the response for you:

```json
{
  "success": true,
  "data": {
    "company_mission": "Spidery is the easiest way to extract data from the web. Developers use us to reliably convert URLs into LLM-ready markdown or structured data with a single API call.",
    "supports_sso": false,
    "is_open_source": true,
    "is_in_yc": true
  }
}
```

### LLM Extraction (Beta)

Used to extract structured data from scraped pages.

```bash
curl -X POST https://api.spidery.khulnasoft.com/v1/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://www.khulnasoft.com/",
      "formats": ["json"],
      "jsonOptions": {
        "schema": {
          "type": "object",
          "properties": {
            "company_mission": {
                      "type": "string"
            },
            "supports_sso": {
                      "type": "boolean"
            },
            "is_open_source": {
                      "type": "boolean"
            },
            "is_in_yc": {
                      "type": "boolean"
            }
          },
          "required": [
            "company_mission",
            "supports_sso",
            "is_open_source",
            "is_in_yc"
          ]
        }
      }
    }'
```

```json
{
  "success": true,
  "data": {
    "content": "Raw Content",
    "metadata": {
      "title": "Khulnasoft",
      "description": "Khulnasoft allows you to easily build AI chat applications. Ingest, customize, then deploy with one line of code anywhere you want. Brought to you by SideGuide",
      "robots": "follow, index",
      "ogTitle": "Khulnasoft",
      "ogDescription": "Khulnasoft allows you to easily build AI chat applications. Ingest, customize, then deploy with one line of code anywhere you want. Brought to you by SideGuide",
      "ogUrl": "https://khulnasoft.com/",
      "ogImage": "https://khulnasoft.com/khulnasoft_new_og1.png",
      "ogLocaleAlternate": [],
      "ogSiteName": "Khulnasoft",
      "sourceURL": "https://khulnasoft.com/"
    },
    "json": {
      "company_mission": "Train a secure AI on your technical resources that answers customer and employee questions so your team doesn't have to",
      "supports_sso": true,
      "is_open_source": false,
      "is_in_yc": true
    }
  }
}
```

### Extracting without a schema (New)

You can now extract without a schema by just passing a `prompt` to the endpoint. The llm chooses the structure of the data.

```bash
curl -X POST https://api.spidery.khulnasoft.com/v1/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "url": "https://docs.spidery.khulnasoft.com/",
      "formats": ["json"],
      "jsonOptions": {
        "prompt": "Extract the company mission from the page."
      }
    }'
```

### Interacting with the page with Actions (Cloud-only)

Spidery allows you to perform various actions on a web page before scraping its content. This is particularly useful for interacting with dynamic content, navigating through pages, or accessing content that requires user interaction.

Here is an example of how to use actions to navigate to google.com, search for Spidery, click on the first result, and take a screenshot.

```bash
curl -X POST https://api.spidery.khulnasoft.com/v1/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
        "url": "google.com",
        "formats": ["markdown"],
        "actions": [
            {"type": "wait", "milliseconds": 2000},
            {"type": "click", "selector": "textarea[title=\"Search\"]"},
            {"type": "wait", "milliseconds": 2000},
            {"type": "write", "text": "spidery"},
            {"type": "wait", "milliseconds": 2000},
            {"type": "press", "key": "ENTER"},
            {"type": "wait", "milliseconds": 3000},
            {"type": "click", "selector": "h3"},
            {"type": "wait", "milliseconds": 3000},
            {"type": "screenshot"}
        ]
    }'
```

### Batch Scraping Multiple URLs (New)

You can now batch scrape multiple URLs at the same time. It is very similar to how the /crawl endpoint works. It submits a batch scrape job and returns a job ID to check the status of the batch scrape.

```bash
curl -X POST https://api.spidery.khulnasoft.com/v1/batch/scrape \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "urls": ["https://docs.spidery.khulnasoft.com", "https://docs.spidery.khulnasoft.com/sdks/overview"],
      "formats" : ["markdown", "html"]
    }'
```

### Search

The search endpoint combines web search with Spidery’s scraping capabilities to return full page content for any query.

Include `scrapeOptions` with `formats: ["markdown"]` to get complete markdown content for each search result otherwise it defaults to getting SERP results (url, title, description).

```bash
curl -X POST https://api.spidery.khulnasoft.com/v1/search \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer YOUR_API_KEY' \
    -d '{
      "query": "What is Khulnasoft?"
    }'
```

```json
{
  "success": true,
  "data": [
    {
      "url": "https://khulnasoft.com",
      "title": "Khulnasoft | AI for CX and Sales",
      "description": "AI for CX and Sales"
    }
  ]
}
```

## Using Python SDK

### Installing Python SDK

```bash
pip install spidery-py
```

### Crawl a website

```python
from spidery.spidery import SpideryApp

app = SpideryApp(api_key="fc-YOUR_API_KEY")

# Scrape a website:
scrape_status = app.scrape_url(
  'https://spidery.khulnasoft.com', 
  params={'formats': ['markdown', 'html']}
)
print(scrape_status)

# Crawl a website:
crawl_status = app.crawl_url(
  'https://spidery.khulnasoft.com', 
  params={
    'limit': 100, 
    'scrapeOptions': {'formats': ['markdown', 'html']}
  },
  poll_interval=30
)
print(crawl_status)
```

### Extracting structured data from a URL

With LLM extraction, you can easily extract structured data from any URL. We support pydantic schemas to make it easier for you too. Here is how you to use it:

```python

from spidery.spidery import SpideryApp

app = SpideryApp(api_key="fc-YOUR_API_KEY")

class ArticleSchema(BaseModel):
    title: str
    points: int
    by: str
    commentsURL: str

class TopArticlesSchema(BaseModel):
    top: List[ArticleSchema] = Field(..., max_items=5, description="Top 5 stories")

data = app.scrape_url('https://news.ycombinator.com', {
    'formats': ['json'],
    'jsonOptions': {
        'schema': TopArticlesSchema.model_json_schema()
    }
})
print(data["json"])
```

## Using the Node SDK

### Installation

To install the Spidery Node SDK, you can use npm:

```bash
npm install @khulnasoft/spidery-js
```

### Usage

1. Get an API key from [spidery.khulnasoft.com](https://spidery.khulnasoft.com)
2. Set the API key as an environment variable named `SPIDERY_API_KEY` or pass it as a parameter to the `SpideryApp` class.

```js
import SpideryApp, { CrawlParams, CrawlStatusResponse } from '@khulnasoft/spidery-js';

const app = new SpideryApp({apiKey: "fc-YOUR_API_KEY"});

// Scrape a website
const scrapeResponse = await app.scrapeUrl('https://spidery.khulnasoft.com', {
  formats: ['markdown', 'html'],
});

if (scrapeResponse) {
  console.log(scrapeResponse)
}

// Crawl a website
const crawlResponse = await app.crawlUrl('https://spidery.khulnasoft.com', {
  limit: 100,
  scrapeOptions: {
    formats: ['markdown', 'html'],
  }
} satisfies CrawlParams, true, 30) satisfies CrawlStatusResponse;

if (crawlResponse) {
  console.log(crawlResponse)
}
```


### Extracting structured data from a URL

With LLM extraction, you can easily extract structured data from any URL. We support zod schema to make it easier for you too. Here is how to use it:

```js
import SpideryApp from "@khulnasoft/spidery-js";
import { z } from "zod";

const app = new SpideryApp({
  apiKey: "fc-YOUR_API_KEY"
});

// Define schema to extract contents into
const schema = z.object({
  top: z
    .array(
      z.object({
        title: z.string(),
        points: z.number(),
        by: z.string(),
        commentsURL: z.string(),
      })
    )
    .length(5)
    .describe("Top 5 stories on Hacker News"),
});

const scrapeResult = await app.scrapeUrl("https://news.ycombinator.com", {
  jsonOptions: { extractionSchema: schema },
});

console.log(scrapeResult.data["json"]);
```

## Open Source vs Cloud Offering

Spidery is open source available under the AGPL-3.0 license. 

To deliver the best possible product, we offer a hosted version of Spidery alongside our open-source offering. The cloud solution allows us to continuously innovate and maintain a high-quality, sustainable service for all users.

Spidery Cloud is available at [spidery.khulnasoft.com](https://spidery.khulnasoft.com) and offers a range of features that are not available in the open source version:

![Open Source vs Cloud Offering](https://raw.githubusercontent.com/khulnasoft/spidery/main/img/open-source-cloud.png)


## Contributing

We love contributions! Please read our [contributing guide](CONTRIBUTING.md) before submitting a pull request. If you'd like to self-host, refer to the [self-hosting guide](SELF_HOST.md).

_It is the sole responsibility of the end users to respect websites' policies when scraping, searching and crawling with Spidery. Users are advised to adhere to the applicable privacy policies and terms of use of the websites prior to initiating any scraping activities. By default, Spidery respects the directives specified in the websites' robots.txt files when crawling. By utilizing Spidery, you expressly agree to comply with these conditions._

## Contributors

<a href="https://github.com/khulnasoft/spidery/graphs/contributors">
  <img alt="contributors" src="https://contrib.rocks/image?repo=khulnasoft/spidery"/>
</a>

## License Disclaimer

This project is primarily licensed under the GNU Affero General Public License v3.0 (AGPL-3.0), as specified in the LICENSE file in the root directory of this repository. However, certain components of this project are licensed under the MIT License. Refer to the LICENSE files in these specific directories for details.

Please note:

- The AGPL-3.0 license applies to all parts of the project unless otherwise specified.
- The SDKs and some UI components are licensed under the MIT License. Refer to the LICENSE files in these specific directories for details.
- When using or contributing to this project, ensure you comply with the appropriate license terms for the specific component you are working with.

For more details on the licensing of specific components, please refer to the LICENSE files in the respective directories or contact the project maintainers.


<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
    <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
        ↑ Back to Top ↑
    </a>
</p>
