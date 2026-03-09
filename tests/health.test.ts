import { describe, it } from "node:test";
import assert from "node:assert/strict";
import "../src/app";

describe("Health Endpoint", () => {
  it("should return 200 and text OK", async () => {
    const port = Number(process.env.PORT) || 3000;
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "OK");
  });
});
