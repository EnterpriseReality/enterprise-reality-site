import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Knowledge Architecture explains responsibility boundaries without maturity claims", async ({
  page,
}) => {
  await page.goto("/knowledge/architecture/");

  await expect(page).toHaveTitle("Knowledge Architecture | Enterprise Reality");
  await expect(
    page.getByRole("heading", {
      name: "How is Enterprise Reality structured and bounded?",
    }),
  ).toBeVisible();

  const main = page.locator("main");
  await expect(main).toContainText("Authority precedes implementation.");
  await expect(main).toContainText(
    "Identity must survive representation change",
  );
  await expect(main).toContainText("The graph represents relationships");
  await expect(main).toContainText(
    "It does not automatically create authority to act.",
  );
  await expect(main).toContainText(
    "Enterprise Reality is authoritative. AI is advisory.",
  );
  await expect(main).toContainText("Structure does not imply release standing");
  await expect(main).not.toContainText("Status:");
  await expect(main).toContainText("Not the source repository or a data lake");

  await expect(
    page.getByRole("link", { name: "Knowledge" }).first(),
  ).toHaveAttribute("href", "/knowledge/");
});

test("Knowledge links to Architecture and Canon provides the verification cross-link", async ({
  page,
}) => {
  await page.goto("/knowledge/");
  await expect(
    page.getByRole("link", { name: "Explore Architecture" }),
  ).toHaveAttribute("href", "/knowledge/architecture/");

  await page.goto("/knowledge/canon/");
  await expect(
    page.getByRole("link", { name: "Explore Architecture" }),
  ).toHaveAttribute("href", "/knowledge/architecture/");
});

test("Knowledge Architecture passes the accessibility smoke check", async ({
  page,
}) => {
  await page.goto("/knowledge/architecture/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
