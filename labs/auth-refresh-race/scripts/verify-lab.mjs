import { spawnSync } from "node:child_process";

function run(testFile) {
  return spawnSync(process.execPath, ["--test", testFile], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8"
  });
}

const baseline = run("test/auth-refresh.test.js");
if (baseline.status === 0) {
  console.error("Baseline unexpectedly passed; the lab no longer reproduces the race.");
  process.exit(1);
}
console.log("✓ Broken baseline reproduces the refresh race deterministically.");

const solution = run("test/solution.test.js");
if (solution.status !== 0) {
  console.error(solution.stdout);
  console.error(solution.stderr);
  process.exit(solution.status || 1);
}
console.log("✓ Reference solution passes concurrency, failure, and secret-log checks.");
