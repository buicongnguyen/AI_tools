import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html",
  "loop-engineering.html",
  "professional-ai-engineering.html",
  "software-engineering-cases.html",
  "assets/accessibility.css",
  "README.md",
  "SOURCES.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "MEASUREMENT_PROTOCOL.md",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/bug.yml",
  ".github/ISSUE_TEMPLATE/content.yml",
  "labs/auth-refresh-race/README.md",
  "labs/auth-refresh-race/src/auth-client.js",
  "labs/auth-refresh-race/test/auth-refresh.test.js",
  "test-set/software-engineering-practice-cases.csv",
  "test-set/professional-practice-scorecard.csv",
  "sitemap.xml",
  "robots.txt",
  "404.html"
];

const failures = [];
const fail = (message) => failures.push(message);
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing required file: ${file}`);
}

const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  if (!/^<!doctype html>/i.test(html)) fail(`${file}: missing doctype`);
  if (!/<html\s+[^>]*lang="en"[^>]*>/i.test(html)) fail(`${file}: missing language`);
  if (!/<meta name="description"/i.test(html)) fail(`${file}: missing meta description`);
  if (!/<link rel="canonical"/i.test(html)) fail(`${file}: missing canonical URL`);
  if (!/<meta property="og:title"/i.test(html)) fail(`${file}: missing OpenGraph metadata`);
  if (!/class="skip-link"[^>]+href="#main-content"/i.test(html)) fail(`${file}: missing skip link`);
  if (!/<main[^>]+id="main-content"/i.test(html)) fail(`${file}: main landmark lacks main-content ID`);
  if (!/assets\/accessibility\.css/i.test(html)) fail(`${file}: missing shared accessibility stylesheet`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) fail(`${file}: duplicate IDs: ${[...new Set(duplicateIds)].join(", ")}`);

  const tables = (html.match(/<table(?:\s|>)/gi) || []).length;
  const captions = (html.match(/<caption(?:\s|>)/gi) || []).length;
  if (tables !== captions) fail(`${file}: ${tables} tables but ${captions} captions`);

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:)/i.test(href)) continue;
    if (href.startsWith("#")) {
      if (!ids.includes(href.slice(1))) fail(`${file}: missing anchor target ${href}`);
      continue;
    }
    const [relativeFile, fragment] = href.split("#");
    const target = path.resolve(root, relativeFile || file);
    if (!fs.existsSync(target)) {
      fail(`${file}: broken local link ${href}`);
      continue;
    }
    if (fragment && target.endsWith(".html")) {
      const targetHtml = fs.readFileSync(target, "utf8");
      if (!new RegExp(`\\sid="${fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).test(targetHtml)) {
        fail(`${file}: missing fragment ${href}`);
      }
    }
  }
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index], next = text[index + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell); if (row.some((value) => value.length)) rows.push(row); row = []; cell = "";
    } else cell += char;
  }
  row.push(cell); if (row.some((value) => value.length)) rows.push(row);
  return rows;
}

for (const [file, expectedRows, requiredColumns] of [
  ["test-set/professional-practice-scorecard.csv", 12, ["task_id", "verified_result_minutes", "human_corrections", "evidence_complete"]],
  ["test-set/software-engineering-practice-cases.csv", 6, ["case_id", "minimum_acceptance", "score_target", "score_12"]]
]) {
  const rows = parseCsv(fs.readFileSync(path.join(root, file), "utf8"));
  const headers = rows[0] || [];
  if (rows.length - 1 !== expectedRows) fail(`${file}: expected ${expectedRows} data rows, found ${rows.length - 1}`);
  for (const column of requiredColumns) if (!headers.includes(column)) fail(`${file}: missing column ${column}`);
  for (const [index, row] of rows.slice(1).entries()) {
    if (row.length !== headers.length) fail(`${file}: row ${index + 2} has ${row.length} cells, expected ${headers.length}`);
  }
}

const sources = fs.readFileSync(path.join(root, "SOURCES.md"), "utf8");
if (!/^Verified \d{4}-\d{2}-\d{2}\./m.test(sources)) fail("SOURCES.md: missing verification date");

if (failures.length) {
  console.error(failures.map((message) => `- ${message}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Static validation passed for ${htmlFiles.length} HTML pages, required artifacts, local links, anchors, captions, and CSV schemas.`);
