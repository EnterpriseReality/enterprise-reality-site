import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const foundationRoutes = [
  ["/", "The enterprise exists beyond its systems"],
  [
    "/enterprise-reality/",
    "Understand the enterprise as more than its systems",
  ],
  [
    "/case-studies/damp-and-mould/",
    "Damp & Mould is a real-world problem pattern",
  ],
] as const;

test("narrative foundation routes are public, canonical and accessible", async ({
  page,
}) => {
  for (const [route, heading] of foundationRoutes) {
    await page.goto(route);
    await expect(
      page.getByRole("heading", { level: 1, name: heading }),
    ).toBeVisible();
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
      "href",
      `https://www.enterprisereality.org${route}`,
    );
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, route).toEqual([]);
  }
});

test("home orients before presenting the response and downstream capabilities", async ({
  page,
}) => {
  await page.goto("/");
  const text = await page.locator("main").innerText();
  const ordered = [
    "The enterprise exists beyond its systems",
    "Understanding becomes fragmented",
    "Damp & Mould makes the problem visible",
    "Coherent governed understanding",
    "Enterprise Reality",
    "The Platform makes Enterprise Reality executable",
    "Explorer helps people investigate Enterprise Reality",
    "Reasoning and action are downstream of understanding",
    "Reference substantiates understanding",
  ];

  for (const [index, item] of ordered.entries()) {
    expect(text.indexOf(item)).toBeGreaterThan(
      index === 0 ? -1 : text.indexOf(ordered[index - 1]),
    );
  }
});

test("Enterprise Reality preserves representation and evidence boundaries", async ({
  page,
}) => {
  await page.goto("/enterprise-reality/");
  const text = await page.locator("main").innerText();

  for (const boundary of [
    "Reality versus representation",
    "Stable identity precedes representation",
    "Evidence and provenance explain belief",
    "Conflicting and incomplete observations remain visible",
    "It is not a single source of truth, master database or data lake.",
  ]) {
    expect(text).toContain(boundary);
  }
});

test("Damp & Mould remains a bounded explanatory case", async ({ page }) => {
  await page.goto("/case-studies/damp-and-mould/");
  const text = await page.locator("main").innerText();

  expect(text).toContain(
    "This is illustrative, not a claim about a particular housing provider or deployment.",
  );
  expect(text).toContain(
    "Disagreement and incomplete evidence are preserved rather than hidden.",
  );
  expect(text).toContain("A bounded investigation pattern");
  expect(text).toContain(
    "it is not automatic execution or autonomous remediation.",
  );
});

test("primary navigation establishes v2 domains without broken destinations", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Primary" });

  await expect(navigation).toContainText("Home");
  await expect(navigation).toContainText("Enterprise Reality");
  await expect(navigation).toContainText("Explorer");
  await expect(navigation).toContainText("Platform");
  await expect(navigation).toContainText("Case Studies");
  await expect(navigation).toContainText("Knowledge");
  await expect(navigation).toContainText("About");
  await expect(
    navigation.getByRole("link", { name: "Enterprise Reality" }),
  ).toHaveAttribute("href", "/enterprise-reality/");
  await expect(
    navigation.getByRole("link", { name: "Case Studies" }),
  ).toHaveAttribute("href", "/case-studies/damp-and-mould/");
  await expect(
    navigation.getByText("Explorer", { exact: true }),
  ).toHaveAttribute("aria-disabled", "true");
  await expect(
    navigation.getByText("Knowledge", { exact: true }),
  ).toHaveAttribute("aria-disabled", "true");
});

test("Explorer status is projected consistently and does not claim availability", () => {
  const projection = readFileSync(
    "src/utilities/public-capabilities.ts",
    "utf8",
  );
  const home = readFileSync("src/pages/index.astro", "utf8");
  const caseStudy = readFileSync(
    "src/pages/case-studies/damp-and-mould.astro",
    "utf8",
  );

  expect(projection).toMatch(
    /programmeStanding:\s+"Authorised product with implemented\/demonstrated capability"/,
  );
  expect(home).toContain('capabilityState("explorer")');
  expect(caseStudy).toContain('capabilityState("explorer")');
  expect(home).toContain("public commercial availability is not");
  expect(caseStudy).toMatch(/public\s+commercial availability is not claimed/);
});

test("skip navigation targets main content", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await skipLink.focus();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});
