import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  ["/index.html", "AI Engineering Launchpad"],
  ["/loop-engineering.html", "Loop Engineering"],
  ["/professional-ai-engineering.html", "Professional Software Engineering with Claude Code + Codex"],
  ["/software-engineering-cases.html", "Practical Software Engineering with Claude Code + Codex"],
  ["/404.html", "Page not found"]
];

for (const [url, heading] of pages) {
  test(`${url} renders without console errors or WCAG A/AA violations`, async ({ page }) => {
    const errors = [];
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(url);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('a.skip-link[href="#main-content"]')).toHaveCount(1);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const violations = results.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target.join(" > "))
    }));
    expect(violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("professional guide synchronizes Claude and Codex views", async ({ page }) => {
  await page.goto("/professional-ai-engineering.html");
  await page.locator('#start [data-tool-choice="codex"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-tool-view", "codex");
  await expect(page.locator('[data-tool-choice="codex"][aria-pressed="true"]')).toHaveCount(12);
  await expect(page.locator('[data-tool="claude"]:visible')).toHaveCount(0);
});

test("casebook filters work and tool selection synchronizes", async ({ page }) => {
  await page.goto("/software-engineering-cases.html");
  await page.locator('[data-filter="performance"]').click();
  await expect(page.locator(".case:visible")).toHaveCount(1);
  await expect(page.locator("#case-performance")).toBeVisible();
  await expect(page.locator("#filter-status")).toHaveText("Showing 1 performance case.");
  await page.locator('#case-performance [data-tool-choice="claude"]').click();
  await expect(page.locator('[data-tool-choice="claude"][aria-pressed="true"]')).toHaveCount(6);
  await expect(page.locator('[data-tool="codex"]:visible')).toHaveCount(0);
});

test("theme controls update the document theme", async ({ page }) => {
  await page.goto("/index.html");
  const before = await page.locator("html").getAttribute("data-theme");
  await page.locator("#theme-toggle").click();
  const after = await page.locator("html").getAttribute("data-theme");
  expect(after).not.toBe(before);
});

for (const [url] of pages.slice(0, 4)) {
  test(`${url} has no horizontal overflow at mobile width`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      offenders: [...document.querySelectorAll("body *")]
        .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
        .sort((a, b) => Math.abs(a.getBoundingClientRect().right - document.documentElement.scrollWidth) - Math.abs(b.getBoundingClientRect().right - document.documentElement.scrollWidth))
        .slice(0, 10)
        .map((element) => ({
          element: `${element.tagName.toLowerCase()}.${element.className || ""}`,
          parent: `${element.parentElement?.tagName.toLowerCase() || ""}.${element.parentElement?.className || ""}`,
          text: element.textContent?.trim().slice(0, 60) || "",
          right: Math.round(element.getBoundingClientRect().right)
        }))
    }));
    expect(dimensions, `Overflowing elements: ${JSON.stringify(dimensions.offenders)}`).toEqual(expect.objectContaining({
      scrollWidth: dimensions.clientWidth
    }));
  });
}
