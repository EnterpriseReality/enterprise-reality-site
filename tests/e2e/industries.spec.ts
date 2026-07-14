import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const sectorRoutes = [
  {
    path: "/industries/housing/",
    title: "Housing: Damp and Mould | Enterprise Reality",
    heading: "Damp and Mould",
  },
  {
    path: "/industries/financial-services/",
    title: "Financial Services: Mortgage Affordability | Enterprise Reality",
    heading: "Mortgage Affordability",
  },
  {
    path: "/industries/healthcare/",
    title: "Healthcare: Patient Escalation | Enterprise Reality",
    heading: "Patient Escalation",
  },
  {
    path: "/industries/government/",
    title: "Government: Citizen Service Eligibility | Enterprise Reality",
    heading: "Citizen Service Eligibility",
  },
  {
    path: "/industries/insurance/",
    title: "Insurance: Claims Assessment | Enterprise Reality",
    heading: "Claims Assessment",
  },
  {
    path: "/industries/energy-and-petroleum/",
    title:
      "Energy and Petroleum: Cargo Transfer Assurance | Enterprise Reality",
    heading: "Cargo Transfer Assurance",
  },
];

const allRoutes = ["/industries/", ...sectorRoutes.map((route) => route.path)];

const requiredScenarioHeadings = [
  "1. Operational Trigger",
  "2. Fragmented Current State",
  "3. Governed Evidence Required",
  "4. Enterprise Reality Reasoning",
  "5. Governed Action Proposal",
  "6. Human Accountability",
  "7. Organisational Value",
  "Constitutional Summary",
];

const constitutionalSummary =
  "Enterprise Reality does not replace the operational systems used within this industry.";

const constitutionalClosingLine = "Understand before change.";

function readBuiltFiles(directory: string): string {
  if (!existsSync(directory)) {
    return "";
  }

  return readdirSync(directory)
    .map((entry) => {
      const path = join(directory, entry);

      if (statSync(path).isDirectory()) {
        return readBuiltFiles(path);
      }

      return path.endsWith(".html") || path.endsWith(".xml")
        ? readFileSync(path, "utf8")
        : "";
    })
    .join("\n");
}

test("industries landing page loads with scenario cards and metadata", async ({
  page,
}) => {
  await page.goto("/industries/");

  await expect(page).toHaveTitle("Industries | Enterprise Reality");
  await expect(page.locator("meta[name='description']")).toHaveAttribute(
    "content",
    /Illustrative industry scenarios/,
  );
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    "https://www.enterprisereality.org/industries/",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Constitutional applicability across regulated sectors",
    }),
  ).toBeVisible();
  await expect(page.locator(".scenario-card")).toHaveCount(sectorRoutes.length);
  await expect(page.locator("script[type='application/ld+json']")).toHaveCount(
    1,
  );
  const structuredData = await page
    .locator("script[type='application/ld+json']")
    .textContent();
  expect(structuredData).toContain("CollectionPage");
});

test("all sector pages load with canonical metadata and scenario structure", async ({
  page,
}) => {
  for (const route of sectorRoutes) {
    await page.goto(route.path);

    await expect(page).toHaveTitle(route.title);
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
      "href",
      `https://www.enterprisereality.org${route.path}`,
    );
    await expect(page.locator("meta[property='og:type']")).toHaveAttribute(
      "content",
      "article",
    );
    await expect(
      page.getByRole("heading", { level: 1, name: route.heading }),
    ).toBeVisible();
    await expect(page.getByText("Illustrative only")).toHaveCount(0);
    await expect(
      page.getByText("illustrative architectural scenario"),
    ).toBeVisible();

    for (const heading of requiredScenarioHeadings) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }

    await expect(page.getByText("Satisfied", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Not Satisfied", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Indeterminate", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("It is not AI inference")).toBeVisible();

    await expect(page.getByText(constitutionalSummary)).toBeVisible();
    await expect(page.getByText("governed constitutional layer")).toBeVisible();
    await expect(
      page.getByText(constitutionalClosingLine, { exact: true }),
    ).toBeVisible();

    const proposalSection = page.locator(
      "article[aria-labelledby='action-proposal']",
    );
    await expect(proposalSection).toContainText("Action Proposal");
    await expect(proposalSection).toContainText(
      "A proposal is not automatic execution.",
    );
    await expect(proposalSection).toContainText(
      "approval or pre-authorisation",
    );
    await expect(proposalSection).toContainText("execution authority");
    await expect(page.getByText("proposes a governed action")).toHaveCount(0);
  }
});

test("housing page contains required constitutional entities", async ({
  page,
}) => {
  await page.goto("/industries/housing/");

  for (const text of [
    "Resident",
    "Property",
    "Tenancy",
    "Inspection",
    "Repair",
    "Vulnerability",
    "Policy",
    "Decision",
    "Action Proposal",
    "Authority",
    "Execution",
  ]) {
    await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
  }

  await expect(
    page.getByText(
      "identifies the resident, tenancy and property, resolves inspection and vulnerability evidence",
    ),
  ).toBeVisible();
});

test("energy and petroleum page loads with cargo transfer assurance content", async ({
  page,
}) => {
  await page.goto("/industries/energy-and-petroleum/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Cargo Transfer Assurance" }),
  ).toBeVisible();
  await expect(page.getByText("Vessel", { exact: true })).toBeVisible();
  await expect(page.getByText("Cargo", { exact: true })).toBeVisible();
  await expect(page.getByText("Tank", { exact: true })).toBeVisible();
  await expect(page.getByText("Measurement", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Operational Policy", { exact: true }),
  ).toBeVisible();
});

test("primary navigation includes industries", async ({ page }) => {
  await page.goto("/industries/");

  const industriesLink = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Industries" });

  await expect(industriesLink).toHaveAttribute("href", "/industries/");
  await expect(industriesLink).toHaveAttribute("aria-current", "page");
});

test("industries internal links are valid", async ({ page, request }) => {
  const hrefs = new Set<string>();

  for (const route of allRoutes) {
    await page.goto(route);
    const routeHrefs = await page
      .locator("a[href^='/'], a[href^='#']")
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
      );

    for (const href of routeHrefs) {
      if (href && !href.startsWith("#")) {
        hrefs.add(href);
      }
    }
  }

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});

test("industries pages have no automated accessibility violations", async ({
  page,
}) => {
  for (const path of allRoutes) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});

test("built industries output preserves public boundary language", () => {
  const builtOutput = readBuiltFiles("dist/industries");

  expect(builtOutput).toContain("architectural examples");
  expect(builtOutput).toContain("not customer references");
  expect(builtOutput).toContain("not a customer story");
  expect(builtOutput).toContain("deployment claim");
  expect(builtOutput).not.toContain("AI fraud detection");
});
