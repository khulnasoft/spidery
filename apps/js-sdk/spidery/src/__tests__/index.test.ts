import { describe, expect, jest, test } from '@jest/globals';

import SpideryApp from '../index';
import axios from 'axios';
import { join } from 'path';
import { readFile } from 'fs/promises';

// Mock jest and set the type
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Get the fixure data from the JSON file in ./fixtures
async function loadFixture(name: string): Promise<string> {
  return await readFile(join(__dirname, 'fixtures', `${name}.json`), 'utf-8')
}

const API_URL = process.env.API_URL ?? "https://api.spidery.khulnasoft.com";

describe('the spidery JS SDK', () => {

  test('Should require an API key only for cloud service', async () => {
    if (API_URL.includes('api.spidery.khulnasoft.com')) {
      // Should throw for cloud service
      expect(() => {
        new SpideryApp({ apiKey: undefined, apiUrl: API_URL });
      }).toThrow('No API key provided');
    } else {
      // Should not throw for self-hosted
      expect(() => {
        new SpideryApp({ apiKey: undefined, apiUrl: API_URL });
      }).not.toThrow();
    }
  });

  test('Should return scraped data from a /scrape API call', async () => {
    const mockData = await loadFixture('scrape');
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: JSON.parse(mockData),
    });

    const apiKey = 'YOUR_API_KEY'
    const app = new SpideryApp<"v0">({ apiKey });
    // Scrape a single URL
    const url = 'https://khulnasoft.com';
    const scrapedData = await app.scrapeUrl(url);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringMatching(/^https:\/\/api.spidery.khulnasoft.com/),
      expect.objectContaining({ url }),
      expect.objectContaining({ headers: expect.objectContaining({'Authorization': `Bearer ${apiKey}`}) }),
    )
    expect(scrapedData.success).toBe(true);
    expect(scrapedData?.data?.metadata.title).toEqual('Khulnasoft');
  });
})