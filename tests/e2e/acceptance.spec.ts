import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(
  readFileSync("acceptance/website-v1/expected/route-manifest.json", "utf8"),
) as { origin: string; routes: string[]; absentRoutes: string[] };

const requiredPrinciples = [
  "Represent reality faithfully.",
  "Resolve evidence explicitly.",
  "Conclude only what is justified.",
  "Act only when justified and permitted.",
  "Understand before change.",
];

const forbiddenPositioning = [
  /Enterprise Reality is (?:a|an) (?:CRM|ERP|workflow engine|chatbot)/i,
  /AI decides/i,
  /autonomous execution/i,
  /production customer deployment/i,
  /production Connect integrations/i,
];

test("required public routes load and reserved publication routes remain absent", async ({
  page,
  request,
}) => {
  for (const route of manifest.routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBeLessThan(400);
    await expect(page.locator("main h1")).toHaveCount(1);
  }

  for (const route of manifest.absentRoutes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(404);
  }
});

test("all required routes expose canonical SEO metadata and valid JSON-LD", async ({
  page,
}) => {
  const seenTitles = new Set<string>();

  for (const route of manifest.routes) {
    await page.goto(route);

    const title = await page.title();
    expect(title, route).toBeTruthy();
    expect(seenTitles.has(title), title).toBe(false);
    seenTitles.add(title);

    await expect(page.locator("meta[name='description']")).toHaveAttribute(
      "content",
      /\S/,
    );
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
      "href",
      new RegExp(`^${manifest.origin.replaceAll(".", "\\.")}`),
    );
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute(
      "content",
      /\S/,
    );
    await expect(page.locator("meta[property='og:url']")).toHaveAttribute(
      "content",
      new RegExp(`^${manifest.origin.replaceAll(".", "\\.")}`),
    );

    const json = await page
      .locator("script[type='application/ld+json']")
      .textContent();
    expect(() => JSON.parse(json ?? "{}")).not.toThrow();
    const graph = (
      JSON.parse(json ?? "{}") as { "@graph"?: Array<Record<string, unknown>> }
    )["@graph"];
    expect(graph?.some((item) => item["@type"] === "Organization")).toBe(true);
    expect(
      graph?.some((item) => String(item["@type"]).includes("Corporation")),
    ).toBe(false);
  }
});

test("public narrative preserves constitutional positioning and boundaries", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText(
      "The Constitutional Decision Platform for Regulated Enterprises",
    ),
  ).toBeVisible();

  await page.goto("/why-enterprise-reality/");
  await expect(page.getByText("Enterprise Reality complements")).toBeVisible();
  await expect(page.getByText("It does not replace ERP, CRM")).toBeVisible();
  await expect(
    page.getByText("AI should not determine constitutional truth"),
  ).toBeVisible();

  await page.goto("/architecture/");
  await expect(
    page.getByText("The Assistant retrieves. It does not decide."),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Decision, action proposal, execution authority and execution remain separate checkpoints.",
    ),
  ).toBeVisible();

  const siteText = await page.locator("body").innerText();
  for (const forbidden of forbiddenPositioning) {
    expect(siteText).not.toMatch(forbidden);
  }

  await page.goto("/roadmap/");
  for (const principle of requiredPrinciples) {
    await expect(page.getByText(principle)).toBeVisible();
  }
});

test("capability status labels match approved release and future status", async ({
  page,
}) => {
  await page.goto("/roadmap/");
  const main = page.locator("main");

  for (const version of [
    "v0.1.0",
    "v0.2.0",
    "v0.3.0",
    "v0.4.0",
    "v0.5.0",
    "v0.6.0",
  ]) {
    const item = page
      .getByRole("list", { name: "Programme milestones" })
      .getByRole("listitem")
      .filter({ hasText: version });

    await expect(item).toContainText("Status:");
    await expect(item).toContainText("Released");
  }

  for (const [name, status] of [
    ["Operational Readiness", "Planned"],
    ["Decision Services", "Planned"],
    ["Explorer", "Planned"],
    ["Assistant", "Research"],
  ]) {
    const region = main.filter({ hasText: name });
    await expect(region).toContainText(status);
  }

  await page.goto("/platform/");
  await expect(page.locator("main")).not.toContainText("Studio Released");
  await expect(page.locator("main")).not.toContainText("Explorer Released");
  await expect(page.locator("main")).not.toContainText("Assistant Released");
  await expect(page.locator("main")).not.toContainText("customer deployment");
});

test("research publication boundary remains truthful", async ({
  page,
  request,
}) => {
  for (const route of ["/research/", "/research/publications/"]) {
    await page.goto(route);
    await expect(
      page.getByText(
        "Approved research publications will appear here following publication review.",
      ),
    ).toBeVisible();
    await expect(page.getByText("ERRS-001")).toHaveCount(0);
    await expect(page.locator(".publication-card")).toHaveCount(0);
  }

  expect((await request.get("/research/publications/errs-001/")).status()).toBe(
    404,
  );
});

test("industry scenarios preserve the shared constitutional scenario structure", async ({
  page,
}) => {
  for (const route of manifest.routes.filter(
    (item) => item.startsWith("/industries/") && item !== "/industries/",
  )) {
    await page.goto(route);

    for (const heading of [
      "1. Operational Trigger",
      "2. Fragmented Current State",
      "3. Governed Evidence Required",
      "4. Enterprise Reality Reasoning",
      "5. Governed Action Proposal",
      "6. Human Accountability",
      "7. Organisational Value",
      "Constitutional Summary",
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }

    await expect(
      page.getByText("Enterprise Reality does not replace"),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "5. Governed Action Proposal" }),
    ).toBeVisible();
    await expect(
      page.getByText("Regulated judgement is preserved"),
    ).toBeVisible();
    await expect(page.locator("main")).toContainText("not a customer story");
  }
});

test("roadmap avoids delivery promises, speculative dates and percentages", async ({
  page,
}) => {
  await page.goto("/roadmap/");
  const mainText = await page.locator("main").innerText();

  expect(mainText).not.toMatch(/\b20\d{2}\b/);
  expect(mainText).not.toMatch(/\bQ[1-4]\b/i);
  expect(mainText).not.toMatch(/\b\d+%/);
  expect(mainText).not.toMatch(/\bengineering-backlog\b/i);
  expect(mainText).toMatch(/contractual commitment/);
});

test("required routes pass automated accessibility smoke checks", async ({
  page,
}) => {
  for (const route of manifest.routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, route).toEqual([]);
  }
});

test("internal links on required routes resolve", async ({ page, request }) => {
  const hrefs = new Set<string>();

  for (const route of manifest.routes) {
    await page.goto(route);
    const pageHrefs = await page
      .locator("a[href^='/']")
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
      );

    for (const href of pageHrefs) {
      if (href) {
        hrefs.add(href);
      }
    }
  }

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});

test("privacy, security and runtime boundaries have no public violations", async ({
  page,
}) => {
  for (const route of manifest.routes) {
    await page.goto(route);
    const html = await page.content();

    expect(html).not.toMatch(/google-analytics|googletagmanager|gtag\(/i);
    expect(html).not.toMatch(/tracking pixel|facebook\.net|hotjar|segment/i);
    expect(html).not.toMatch(/cookie banner/i);
    expect(html).not.toMatch(/intercom|drift|crisp/i);
    expect(html).not.toMatch(/api[_-]?key|BEGIN PRIVATE KEY/i);
    expect(html).not.toMatch(/\/api\//i);
  }
});

test("mobile navigation is accessible and free from keyboard traps", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const button = page.getByRole("button", { name: "Menu" });
  await button.focus();
  await expect(button).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
});
