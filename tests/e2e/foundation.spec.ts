import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

test("home page loads with core metadata and maturity status text", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  await page.goto("/");

  await expect(page).toHaveTitle("Enterprise Reality");
  await expect(page.locator("meta[name='description']")).toHaveAttribute(
    "content",
    /Constitutional Decision Platform/,
  );
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    "https://www.enterprisereality.org/",
  );
  await expect(
    page.getByRole("heading", { level: 1, name: "Enterprise Reality" }),
  ).toBeVisible();
  await expect(page.locator(".status-badge--released")).toContainText(
    /Status:\s*Released/,
  );
  await expect(page.locator(".status-badge--planned")).toContainText(
    /Status:\s*Planned/,
  );
  expect(errors).toEqual([]);
});

test("custom 404 page loads", async ({ page }) => {
  await page.goto("/404");
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeVisible();
});

test("skip navigation targets main content", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });

  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute("href", "#main-content");
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("desktop navigation is accessible", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Primary" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Home" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("mobile menu is keyboard operable and exposes accessible state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const button = page.getByRole("button", { name: "Menu" });
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
});

test("foundation internal links are valid", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href^='/'], a[href^='#']")
    .evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
    );

  for (const href of hrefs) {
    if (!href || href.startsWith("#")) {
      continue;
    }

    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});

test("core pages have no automated accessibility violations", async ({
  page,
}) => {
  for (const path of ["/", "/404"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});

test("built output excludes drafts and prohibited private markers", () => {
  const index = readFileSync("dist/index.html", "utf8");
  expect(index).not.toContain("Foundation Architecture Demonstration");

  const result = execFileSync(
    "node",
    ["scripts/check-public-boundary.mjs", "dist"],
    {
      encoding: "utf8",
    },
  );
  expect(result).toContain("Public/private boundary check passed");
});

test("reduced motion handling exists", () => {
  const css = readFileSync("src/styles/global.css", "utf8");
  expect(css).toContain("@media (prefers-reduced-motion: reduce)");
});

test("repeated builds remain semantically stable", () => {
  execFileSync("npm", ["run", "build"], { stdio: "pipe" });
  const firstHash = createHash("sha256")
    .update(readFileSync("dist/index.html"))
    .digest("hex");
  execFileSync("npm", ["run", "build"], { stdio: "pipe" });
  const secondHash = createHash("sha256")
    .update(readFileSync("dist/index.html"))
    .digest("hex");

  expect(secondHash).toBe(firstHash);
});
