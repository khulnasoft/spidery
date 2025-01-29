import { generateURLPermutations } from "./crawl-redis";

describe("generateURLPermutations", () => {
  it("generates permutations correctly", () => {
    const bareHttps = generateURLPermutations(
      "https://spidery.khulnasoft.com",
    ).map((x) => x.href);
    expect(bareHttps.length).toBe(4);
    expect(bareHttps.includes("https://spidery.khulnasoft.com/")).toBe(true);
    expect(bareHttps.includes("https://www.spidery.khulnasoft.com/")).toBe(
      true,
    );
    expect(bareHttps.includes("http://spidery.khulnasoft.com/")).toBe(true);
    expect(bareHttps.includes("http://www.spidery.khulnasoft.com/")).toBe(true);

    const bareHttp = generateURLPermutations(
      "http://spidery.khulnasoft.com",
    ).map((x) => x.href);
    expect(bareHttp.length).toBe(4);
    expect(bareHttp.includes("https://spidery.khulnasoft.com/")).toBe(true);
    expect(bareHttp.includes("https://www.spidery.khulnasoft.com/")).toBe(true);
    expect(bareHttp.includes("http://spidery.khulnasoft.com/")).toBe(true);
    expect(bareHttp.includes("http://www.spidery.khulnasoft.com/")).toBe(true);

    const wwwHttps = generateURLPermutations(
      "https://www.spidery.khulnasoft.com",
    ).map((x) => x.href);
    expect(wwwHttps.length).toBe(4);
    expect(wwwHttps.includes("https://spidery.khulnasoft.com/")).toBe(true);
    expect(wwwHttps.includes("https://www.spidery.khulnasoft.com/")).toBe(true);
    expect(wwwHttps.includes("http://spidery.khulnasoft.com/")).toBe(true);
    expect(wwwHttps.includes("http://www.spidery.khulnasoft.com/")).toBe(true);

    const wwwHttp = generateURLPermutations(
      "http://www.spidery.khulnasoft.com",
    ).map((x) => x.href);
    expect(wwwHttp.length).toBe(4);
    expect(wwwHttp.includes("https://spidery.khulnasoft.com/")).toBe(true);
    expect(wwwHttp.includes("https://www.spidery.khulnasoft.com/")).toBe(true);
    expect(wwwHttp.includes("http://spidery.khulnasoft.com/")).toBe(true);
    expect(wwwHttp.includes("http://www.spidery.khulnasoft.com/")).toBe(true);
  });
});
