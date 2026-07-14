import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const milestones = [
  ["v0.1.0", "Metadata Foundation", "Released"],
  ["v0.2.0", "Metadata Platform", "Released"],
  ["v0.3.0", "Enterprise Corpus", "Released"],
  ["v0.4.0", "Enterprise Reality Graph", "Released"],
  ["v0.5.0", "Enterprise Reasoning Engine", "Released"],
  ["v0.6.0", "Enterprise Automation Engine", "Released"],
];

const futureCapabilities = [
  ["Operational Readiness", "Planned"],
  ["Decision Services", "Planned"],
  ["Explorer", "Planned"],
  ["Assistant", "Research"],
];

const unsupportedDatePatterns = [
  /\b20\d{2}\b/,
  /\bQ[1-4]\b/i,
  /\bJanuary|February|March|April|May|June|July|August|September|October|November|December\b/,
  /\bdeadline\b/i,
  /\bETA\b/i,
  /\b\d+%/,
  /\bpercent(?:age)?\b/i,
];

test("roadmap page loads with canonical metadata and active navigation", async ({
  page,
}) => {
  await page.goto("/roadmap/");

  await expect(page).toHaveTitle("Roadmap | Enterprise Reality");
  await expect(page.locator("meta[name='description']")).toHaveAttribute(
    "content",
    /programme evolution, release progression and future direction/,
  );
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    "https://www.enterprisereality.org/roadmap/",
  );
  await expect(page.locator("meta[property='og:url']")).toHaveAttribute(
    "content",
    "https://www.enterprisereality.org/roadmap/",
  );
  await expect(
    page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Roadmap" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Roadmap for constitutional capability",
    }),
  ).toBeVisible();
});

test("timeline contains approved milestones with visible textual statuses", async ({
  page,
}) => {
  await page.goto("/roadmap/");

  const timeline = page.getByRole("list", { name: "Programme milestones" });

  for (const [version, title, status] of milestones) {
    const item = timeline
      .getByRole("listitem")
      .filter({ hasText: version })
      .filter({ hasText: title });

    await expect(item).toContainText(status);
    await expect(item).toContainText("Status:");
  }
});

test("next platform stage and future direction use approved status vocabulary", async ({
  page,
}) => {
  await page.goto("/roadmap/");

  const nextPlatformStage = page
    .getByRole("region", { name: "Next Platform Stage" })
    .filter({ hasText: "Operational Readiness" });

  await expect(
    page.getByRole("heading", { level: 2, name: "Operational Readiness" }),
  ).toBeVisible();
  await expect(nextPlatformStage).toContainText("Status:");
  await expect(nextPlatformStage).toContainText("Planned");
  await expect(nextPlatformStage).toContainText("next platform stage");
  await expect(page.getByText("Current programme work centres on")).toHaveCount(
    0,
  );
  await expect(page.locator("main")).not.toContainText("In Development");

  for (const [capability, status] of futureCapabilities.slice(1)) {
    const card = page.locator(".roadmap-future .card").filter({
      has: page.getByRole("heading", { name: capability }),
    });

    await expect(card).toContainText(status);
    await expect(card).toContainText("Status:");
  }
});

test("roadmap avoids unsupported delivery commitments and private backlog exposure", async ({
  page,
}) => {
  await page.goto("/roadmap/");

  const mainText = await page.locator("main").innerText();

  for (const pattern of unsupportedDatePatterns) {
    expect(mainText, String(pattern)).not.toMatch(pattern);
  }

  await expect(page.getByText("engineering-backlog")).toHaveCount(0);
  await expect(page.getByText("sprint board")).toHaveCount(0);
  await expect(page.getByText("contractual commitment")).toBeVisible();
  await expect(page.getByText("delivery dates")).toBeVisible();
});

test("roadmap exposes capability progression and programme philosophy", async ({
  page,
}) => {
  await page.goto("/roadmap/");

  const releasedFoundations = page.getByRole("list", {
    name: "Released Platform Foundations",
  });
  const futureDirection = page.getByRole("list", {
    name: "Future Product Direction",
  });

  await expect(
    page.getByRole("heading", { name: "Released Platform Foundations" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Next Platform Stage" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Future Product Direction" }),
  ).toBeVisible();

  for (const capability of [
    "Metadata Foundation",
    "Metadata Platform",
    "Enterprise Corpus",
    "Enterprise Reality Graph",
    "Enterprise Reasoning Engine",
    "Enterprise Automation Engine",
  ]) {
    await expect(releasedFoundations).toContainText(capability);
    await expect(releasedFoundations).toContainText("Released");
  }

  await expect(
    page.getByRole("heading", { level: 2, name: "Operational Readiness" }),
  ).toBeVisible();

  for (const capability of ["Decision Services", "Explorer", "Assistant"]) {
    await expect(futureDirection).toContainText(capability);
  }

  const governance = page.getByRole("list", {
    name: "Constitutional programme evolution",
  });

  for (const stage of [
    "Architecture",
    "Implementation",
    "Verification",
    "Publication",
    "Release",
  ]) {
    await expect(governance).toContainText(stage);
  }
});

test("roadmap page has no automated accessibility violations", async ({
  page,
}) => {
  await page.goto("/roadmap/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
