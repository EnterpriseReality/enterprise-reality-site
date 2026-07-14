import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const researchRoutes = ["/research/", "/research/publications/"];
const emptyState =
  "Approved research publications will appear here following publication review.";

function readBuiltFiles(root: string): string {
  if (!existsSync(root)) {
    return "";
  }

  return readdirSync(root, { withFileTypes: true })
    .map((entry) => {
      const path = join(root, entry.name);

      if (entry.isDirectory()) {
        return readBuiltFiles(path);
      }

      return path.endsWith(".html") || path.endsWith(".xml")
        ? readFileSync(path, "utf8")
        : "";
    })
    .join("\n");
}

test("research landing page loads with approved empty state", async ({
  page,
}) => {
  await page.goto("/research/");

  await expect(page).toHaveTitle("Research | Enterprise Reality");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Research governed as public evidence",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Enterprise Reality Research Series",
    }),
  ).toBeVisible();
  await expect(page.getByText(emptyState)).toBeVisible();
  await expect(page.getByText("ERRS-001")).toHaveCount(0);
  await expect(page.locator(".publication-card")).toHaveCount(0);
});

test("publication index loads with approved empty state only", async ({
  page,
  request,
}) => {
  await page.goto("/research/publications/");

  await expect(page).toHaveTitle("Research Publications | Enterprise Reality");
  await expect(
    page.getByRole("heading", { level: 1, name: "Research publications" }),
  ).toBeVisible();
  await expect(page.getByText(emptyState)).toBeVisible();
  await expect(page.getByText("ERRS-001")).toHaveCount(0);
  await expect(page.locator(".publication-card")).toHaveCount(0);

  const draftResponse = await request.get("/research/publications/draft/");
  expect(draftResponse.status()).toBe(404);
});

test("reserved ERRS-001 route is not generated without an approved manuscript", async ({
  request,
}) => {
  const response = await request.get("/research/publications/errs-001/");
  expect(response.status()).toBe(404);
});

test("built output contains no ERRS-001 placeholder publication metadata", () => {
  const builtOutput = readBuiltFiles("dist");

  expect(existsSync("dist/research/publications/errs-001")).toBe(false);
  expect(builtOutput).not.toContain("ERRS-001");
  expect(builtOutput).not.toContain(
    "A Constitutional Governance Model for AI-Assisted Software Engineering",
  );
  expect(builtOutput).not.toContain("Canonical citation");
  expect(builtOutput).not.toContain("ScholarlyArticle");
  expect(builtOutput).not.toContain("Not yet published");
  expect(builtOutput).not.toContain("Placeholder research publication record");
  expect(builtOutput).toContain(emptyState);
});

test("dynamic publication infrastructure remains in place", () => {
  expect(existsSync("src/pages/research/publications/[slug].astro")).toBe(true);
  expect(existsSync("src/layouts/PublicationLayout.astro")).toBe(true);
  expect(existsSync("src/components/PublicationCard.astro")).toBe(true);

  const dynamicRoute = readFileSync(
    "src/pages/research/publications/[slug].astro",
    "utf8",
  );
  expect(dynamicRoute).toContain("getStaticPaths");
  expect(dynamicRoute).toContain("visibleResearchPublications");
});

test("research internal links are valid", async ({ page, request }) => {
  const hrefs = new Set<string>();

  for (const route of researchRoutes) {
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

test("research pages have no automated accessibility violations", async ({
  page,
}) => {
  for (const path of researchRoutes) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});
