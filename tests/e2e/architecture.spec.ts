import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const layers = [
  "Governed Publications",
  "Metadata Engine",
  "Enterprise Corpus",
  "Enterprise Reality Graph",
  "Enterprise Reasoning Engine",
  "Enterprise Automation Engine",
  "Enterprise AI Runtime",
];

const ownershipComponents = [
  "Governed Repository / Publications",
  "Metadata Engine",
  "Enterprise Corpus",
  "Enterprise Reality Graph",
  "Enterprise Reasoning Engine",
  "Enterprise Automation Engine",
  "Enterprise AI Runtime",
];

const reasoningPipeline = [
  "Enterprise Reality Graph",
  "Relationship Path Evaluation",
  "Evidence Resolution",
  "Outcome Resolution",
  "Explanation Generation",
];

const automationProgression = [
  "Reasoning Report",
  "Automation Policy",
  "Eligibility",
  "Automation Decision",
  "Action Proposal",
  "Approval or Pre-Authorisation",
  "Execution Authority",
  "Execution Request",
  "Execution",
  "Execution Record",
  "Idempotency and Retry Governance",
];

const ladderStages = [
  {
    stage: "Truth",
    meaning:
      "Exists independently of systems and remains true whether or not it has been recorded.",
  },
  {
    stage: "Reality",
    meaning:
      "The enterprise state expressed through stable identities, events, relationships and obligations.",
  },
  {
    stage: "Representation",
    meaning:
      "Governed models that describe reality without claiming to replace it.",
  },
  {
    stage: "Evidence",
    meaning:
      "Governed observations that support, contradict or leave an assertion unresolved.",
  },
  {
    stage: "Reasoning",
    meaning:
      "Deterministic evaluation over governed relationships and evidence.",
  },
  {
    stage: "Decision",
    meaning:
      "A justified constitutional conclusion produced from reasoning and policy.",
  },
  {
    stage: "Action",
    meaning: "A governed response proposed as a consequence of a decision.",
  },
  {
    stage: "Automation",
    meaning: "Coordinated execution only after explicit authority exists.",
  },
  {
    stage: "Assistance",
    meaning:
      "AI retrieves, explains and recommends without owning truth, decision or authority.",
  },
];

const forbiddenDistMarkers = [
  "Foundation Architecture Demonstration",
  "internal engineering backlog",
  "private platform source",
  "customer reference",
];

const readFiles = (directory: string): string[] => {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);

    if (statSync(path).isDirectory()) {
      return readFiles(path);
    }

    return [readFileSync(path, "utf8")];
  });
};

test("architecture route loads with canonical metadata and navigation", async ({
  page,
}) => {
  await page.goto("/architecture/");

  await expect(page).toHaveTitle("Architecture | Enterprise Reality");
  await expect(page.locator("meta[name='description']")).toHaveAttribute(
    "content",
    /constitutional architecture of Enterprise Reality/,
  );
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    "https://www.enterprisereality.org/architecture/",
  );
  await expect(page.locator("meta[property='og:url']")).toHaveAttribute(
    "content",
    "https://www.enterprisereality.org/architecture/",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Enterprise Reality architecture",
    }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Architecture" }),
  ).toHaveAttribute("aria-current", "page");
});

test("runtime progression exposes every approved layer with textual status", async ({
  page,
}) => {
  await page.goto("/architecture/");

  for (const layer of layers) {
    const detail = page
      .locator(".architecture-layer__name")
      .getByText(layer, { exact: true })
      .locator("xpath=ancestor::details");

    await expect(detail).toContainText(layer);
    await expect(detail).toContainText(
      /Status:\s*(Released|In Development|Research)/,
    );
    await expect(detail).toContainText("Purpose");
    await expect(detail).toContainText("Primary responsibility");
    await expect(detail).toContainText("Key inputs");
    await expect(detail).toContainText("Key outputs");
    await expect(detail).toContainText("Does not own");
  }
});

test("ownership table includes required components and boundaries", async ({
  page,
}) => {
  await page.goto("/architecture/");

  const table = page.getByRole("table", {
    name: "Enterprise Reality component ownership boundaries.",
  });

  await expect(table).toBeVisible();
  await expect(
    table.getByRole("columnheader", { name: "Component" }),
  ).toBeVisible();
  await expect(table.getByRole("columnheader", { name: "Owns" })).toBeVisible();
  await expect(
    table.getByRole("columnheader", { name: "Does Not Own" }),
  ).toBeVisible();

  for (const component of ownershipComponents) {
    await expect(table).toContainText(component);
  }
});

test("reasoning, automation, open-world outcomes, AI boundary and ladder are present", async ({
  page,
}) => {
  await page.goto("/architecture/");

  for (const item of reasoningPipeline) {
    await expect(
      page.getByRole("list", { name: "Reasoning pipeline" }),
    ).toContainText(item);
  }

  await expect(
    page.getByText("Validation observes. Statistics observes."),
  ).toHaveCount(0);
  await expect(
    page.getByText("Validation observes. Statistics observe."),
  ).toBeVisible();

  for (const item of automationProgression) {
    await expect(
      page.getByRole("list", { name: "Automation progression" }),
    ).toContainText(item);
  }

  await expect(page.getByText("SATISFIED", { exact: true })).toBeVisible();
  await expect(page.getByText("NOT_SATISFIED", { exact: true })).toBeVisible();
  await expect(page.getByText("INDETERMINATE", { exact: true })).toBeVisible();
  await expect(
    page.getByText(
      "AI assists. It does not establish constitutional authority.",
    ),
  ).toBeVisible();
  await expect(
    page.getByText("The Assistant retrieves. It does not decide."),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "There is no direct constitutional path from Reality to AI",
    }),
  ).toBeVisible();

  const ladder = page.getByRole("list", { name: "Constitutional Ladder" });
  await expect(ladder.getByRole("listitem")).toHaveCount(ladderStages.length);
  for (const [index, { stage, meaning }] of ladderStages.entries()) {
    const item = ladder.getByRole("listitem").nth(index);

    await expect(item).toContainText(stage);
    await expect(item).toContainText(meaning);
  }
});

test("architecture content remains visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto("/architecture/");
  const runtimeProgression = page.getByRole("list", {
    name: "Constitutional runtime progression",
  });
  const reasoningList = page.getByRole("list", { name: "Reasoning pipeline" });
  const automationList = page.getByRole("list", {
    name: "Automation progression",
  });
  const ladder = page.getByRole("list", { name: "Constitutional Ladder" });

  await expect(
    runtimeProgression.getByText("Governed Publications", { exact: true }),
  ).toBeVisible();
  await expect(
    runtimeProgression.getByText("Enterprise AI Runtime", { exact: true }),
  ).toBeVisible();
  await expect(
    reasoningList.getByText("Relationship Path Evaluation", { exact: true }),
  ).toBeVisible();
  await expect(
    automationList.getByText("Execution Record", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("The Assistant retrieves. It does not decide."),
  ).toBeVisible();
  await expect(ladder.getByRole("listitem")).toHaveCount(ladderStages.length);
  for (const [index, { stage, meaning }] of ladderStages.entries()) {
    const item = ladder.getByRole("listitem").nth(index);

    await expect(item).toContainText(stage);
    await expect(item).toContainText(meaning);
  }

  await context.close();
});

test("decision, action proposal, authority and execution remain separate", async ({
  page,
}) => {
  await page.goto("/architecture/");

  const automationList = page.getByRole("list", {
    name: "Automation progression",
  });

  await expect(
    page.getByText(
      "Decision, action proposal, execution authority and execution remain separate checkpoints.",
    ),
  ).toBeVisible();
  await expect(
    automationList.getByText("Automation Decision", { exact: true }),
  ).toBeVisible();
  await expect(
    automationList.getByText("Action Proposal", { exact: true }),
  ).toBeVisible();
  await expect(
    automationList.getByText("Approval or Pre-Authorisation", { exact: true }),
  ).toBeVisible();
  await expect(
    automationList.getByText("Execution Authority", { exact: true }),
  ).toBeVisible();
  await expect(
    automationList.getByText("Execution Request", { exact: true }),
  ).toBeVisible();
  await expect(
    automationList.getByText("Execution", { exact: true }),
  ).toBeVisible();
  await expect(
    automationList.getByText("Execution Record", { exact: true }),
  ).toBeVisible();
});

test("enhanced architecture interaction is keyboard operable and exposes state", async ({
  page,
}) => {
  await page.goto("/architecture/");

  const firstSummary = page.locator("summary").filter({
    hasText: "Governed Publications",
  });
  const graphSummary = page.locator("summary").filter({
    hasText: "Enterprise Reality Graph",
  });

  await expect(firstSummary).toHaveAttribute("aria-expanded", "true");
  await expect(graphSummary).toHaveAttribute("aria-expanded", "false");

  await graphSummary.focus();
  await expect(graphSummary).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(graphSummary).toHaveAttribute("aria-expanded", "true");
  await expect(firstSummary).toHaveAttribute("aria-expanded", "false");

  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
});

test("architecture page has no obvious accessibility violations", async ({
  page,
}) => {
  await page.goto("/architecture/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("architecture internal links resolve and remaining deferred routes are not introduced", async ({
  page,
  request,
}) => {
  await page.goto("/architecture/");
  const hrefs = await page
    .locator("a[href^='/']")
    .evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
    );

  expect(hrefs).not.toContain("/industries/");
  expect(hrefs).not.toContain("/roadmap/");
  expect(hrefs).not.toContain("/releases/");

  for (const href of hrefs) {
    if (href) {
      const response = await request.get(href);
      expect(response.status(), href).toBeLessThan(400);
    }
  }
});

test("reduced-motion support and private boundary remain present", () => {
  const css = readFileSync("src/styles/global.css", "utf8");
  expect(css).toContain("@media (prefers-reduced-motion: reduce)");

  const distText = readFiles("dist").join("\n");
  for (const marker of forbiddenDistMarkers) {
    expect(distText).not.toContain(marker);
  }
});
