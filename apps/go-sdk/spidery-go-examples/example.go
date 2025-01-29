// change the api key to your own
// go run example.go

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/khulnasoft/spidery/apps/go-sdk/spidery-go"
)

func ptr[T any](v T) *T {
	return &v
}

func main() {
	app, err := spidery.NewSpideryApp("fc-YOUR_API_KEY", "https://api.spidery.khulnasoft.com")
	if err != nil {
		log.Fatalf("Failed to create SpideryApp: %v", err)
	}

	// Scrape a website
	scrapeResult, err := app.ScrapeURL("spidery.khulnasoft.com", nil)
	if err != nil {
		log.Fatalf("Failed to scrape URL: %v", err)
	}
	fmt.Println(scrapeResult.Markdown)

	// Crawl a website
	idempotencyKey := uuid.New().String() // optional idempotency key
	crawlParams := &spidery.CrawlParams{
		ExcludePaths: []string{"blog/*"},
		MaxDepth:     ptr(2),
	}
	crawlResult, err := app.CrawlURL("khulnasoft.com", crawlParams, &idempotencyKey)
	if err != nil {
		log.Fatalf("Failed to crawl URL: %v", err)
	}
	jsonCrawlResult, err := json.MarshalIndent(crawlResult, "", "  ")
	if err != nil {
		log.Fatalf("Failed to marshal crawl result: %v", err)
	}
	fmt.Println(string(jsonCrawlResult))

	asyncCrawlParams := &spidery.CrawlParams{
		ExcludePaths: []string{"blog/*"},
		ScrapeOptions: spidery.ScrapeParams{
			Formats: []string{"markdown", "html", "rawHtml", "screenshot", "links"},
		},
		MaxDepth: ptr(2),
	}
	asyncCrawlResponse, err := app.AsyncCrawlURL("khulnasoft.com", asyncCrawlParams, nil)
	if err != nil {
		log.Fatalf("Failed to async crawl URL: %v", err)
	}

	const maxChecks = 15
	checks := 0

	for {
		if checks >= maxChecks {
			break
		}

		time.Sleep(2 * time.Second) // wait for 2 seconds

		response, err := app.CheckCrawlStatus(asyncCrawlResponse.ID)
		if err != nil {
			log.Fatalf("Failed to check crawl status: %v", err)
		}

		if response.Status == "completed" {
			break
		}

		checks++
	}

	// Final check after loop or if completed
	completedCrawlResponse, err := app.CheckCrawlStatus(asyncCrawlResponse.ID)
	if err != nil {
		log.Fatalf("Failed to check crawl status: %v", err)
	}

	jsonCompletedCrawlResponse, err := json.MarshalIndent(completedCrawlResponse, "", "  ")
	if err != nil {
		log.Fatalf("Failed to marshal async crawl result: %v", err)
	}

	fmt.Println(string(jsonCompletedCrawlResponse))

	// LLM Extraction using JSON schema
	// jsonSchema := map[string]any{
	// 	"type": "object",
	// 	"properties": map[string]any{
	// 		"top": map[string]any{
	// 			"type": "array",
	// 			"items": map[string]any{
	// 				"type": "object",
	// 				"properties": map[string]any{
	// 					"title":       map[string]string{"type": "string"},
	// 					"points":      map[string]string{"type": "number"},
	// 					"by":          map[string]string{"type": "string"},
	// 					"commentsURL": map[string]string{"type": "string"},
	// 				},
	// 				"required": []string{"title", "points", "by", "commentsURL"},
	// 			},
	// 			"minItems":    5,
	// 			"maxItems":    5,
	// 			"description": "Top 5 stories on Hacker News",
	// 		},
	// 	},
	// 	"required": []string{"top"},
	// }

	// llmExtractionParams := &spidery.ScrapeParams{
	// 	ExtractorOptions: spidery.ExtractorOptions{
	// 		ExtractionSchema: jsonSchema,
	// 		Mode:             "llm-extraction",
	// 	},
	// 	PageOptions: spidery.PageOptions{
	// 		OnlyMainContent: prt(true),
	// 	},
	// }

	// llmExtractionResult, err := app.ScrapeURL("https://news.ycombinator.com", llmExtractionParams)
	// if err != nil {
	// 	log.Fatalf("Failed to perform LLM extraction: %v", err)
	// }

	// // Pretty print the LLM extraction result
	// jsonResult, err := json.MarshalIndent(llmExtractionResult.LLMExtraction, "", "  ")
	// if err != nil {
	// 	log.Fatalf("Failed to marshal LLM extraction result: %v", err)
	// }
	// fmt.Println(string(jsonResult))

	mapResult, err := app.MapURL("https://spidery.khulnasoft.com", &spidery.MapParams{
		Search: ptr("blog"),
	})
	if err != nil {
		log.Fatalf("Failed to map URL: %v", err)
	}
	jsonMapResult, err := json.MarshalIndent(mapResult, "", "  ")
	if err != nil {
		log.Fatalf("Failed to marshal map result: %v", err)
	}
	fmt.Println(string(jsonMapResult))
}
