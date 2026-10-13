
const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("./server");

test("free user can make five AI requests, but the sixth is rejected", async () => {
  for (let i = 0; i < 5; i++) {
    const response = await request(app)
      .post("/ai/generate")
      .set("X-User-ID", "test-free-user")
      .set("X-User-Tier", "free");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { ok: true });
  }

  const response = await request(app)
    .post("/ai/generate")
    .set("X-User-ID", "test-free-user")
    .set("X-User-Tier", "free");

  assert.equal(response.status, 429);
  assert.equal(response.body.error, "rate_limit_exceeded");
  assert.equal(response.body.limit, 5);
  assert.equal(response.body.window_seconds, 60);
  assert.ok(response.body.retry_after_seconds >= 0);
  assert.ok(response.body.retry_after_seconds <= 60);
});
