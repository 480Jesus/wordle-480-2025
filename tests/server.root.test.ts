import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("Frontend delivery", () => {
  it("GET / devuelve index.html", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("<html");
  });
});
