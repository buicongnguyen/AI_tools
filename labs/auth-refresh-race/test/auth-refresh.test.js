import assert from "node:assert/strict";
import test from "node:test";
import { AuthClient } from "../src/auth-client.js";
import { FakeAuthServer } from "../src/fake-auth-server.js";

test("concurrent expired requests share one refresh", async () => {
  const server = new FakeAuthServer({ barrierParties: 2 });
  const client = new AuthClient(server);

  const results = await Promise.allSettled([
    client.request("profile"),
    client.request("notifications")
  ]);

  assert.equal(server.refreshCalls, 1, "only one refresh may be in flight");
  assert.equal(client.logoutCount, 0, "a successful shared refresh must not log out");
  assert.ok(results.every((result) => result.status === "fulfilled"));
});
