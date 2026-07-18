import assert from "node:assert/strict";
import test from "node:test";
import { AuthClient } from "../solution/auth-client.js";
import { FakeAuthServer } from "../src/fake-auth-server.js";

test("concurrent expired requests share one refresh", async () => {
  const logs = [];
  const server = new FakeAuthServer();
  const client = new AuthClient(server, (message) => logs.push(message));

  const results = await Promise.all([
    client.request("profile"),
    client.request("notifications")
  ]);

  assert.equal(server.refreshCalls, 1);
  assert.equal(client.logoutCount, 0);
  assert.equal(results.length, 2);
  assert.ok(results.every((result) => result.authorization === "Bearer access-1"));
  assert.ok(logs.every((message) => !/access-|refresh-/.test(message)));
});

test("one failed shared refresh logs out once", async () => {
  const server = new FakeAuthServer({ failRefresh: true });
  const client = new AuthClient(server);

  const results = await Promise.allSettled([
    client.request("profile"),
    client.request("notifications")
  ]);

  assert.equal(server.refreshCalls, 1);
  assert.equal(client.logoutCount, 1);
  assert.ok(results.every((result) => result.status === "rejected"));
});
