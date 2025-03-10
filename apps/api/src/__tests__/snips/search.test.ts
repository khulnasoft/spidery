import { search } from "./lib";

describe("Search tests", () => {
  it.concurrent(
    "works",
    async () => {
      await search({
        query: "spidery",
      });
    },
    60000,
  );
});
