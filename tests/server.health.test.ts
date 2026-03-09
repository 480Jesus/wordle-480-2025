import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("Healthcheck", () => {
  it("GET /health devuelve 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.text).toContain("OK");
  });
});
