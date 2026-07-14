import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const coreRoutes = [
  {
    path: "/",
    title: "Enterprise Reality",
    heading: "Enterprise Reality",
    description: /Constitutional Decision Platform/,
    canonical: "https://www.enterprisereality.org/",
  },
  {
    path: "/why-enterprise-reality/",
    title: "Why Enterprise Reality | Enterprise Reality",
    heading: "Enterprises need governed understanding before automation",
    description: /governed truth/,
    canonical: "https://www.enterprisereality.org/why-enterprise-reality/",
  },
  {
    path: "/platform/",
    title: "Platform | Enterprise Reality",
    heading: "A constitutional platform for explainable enterprise decisions",
    description: /platform capabilities/,
    canonical: "https://www.enterprisereality.org/platform/",
  },
  {
    path: "/architecture/",
    title: "Architecture | Enterprise Reality",
    heading: "Enterprise Reality architecture",
    description: /constitutional architecture of Enterprise Reality/,
    canonical: "https://www.enterprisereality.org/architecture/",
  },
  {
    path: "/research/",
    title: "Research | Enterprise Reality",
    heading: "Research governed as public evidence",
    description: /research programme/,
    canonical: "https://www.enterprisereality.org/research/",
  },
  {
    path: "/constitution-driven-engineering/",
    title: "Constitution-Driven Engineering | Enterprise Reality",
    heading: "Engineering from governed meaning to tested release",
    description: /guides Enterprise Reality implementation/,
    canonical:
      "https://www.enterprisereality.org/constitution-driven-engineering/",
  },
  {
    path: "/about/",
    title: "About | Enterprise Reality",
    heading: "The Enterprise Reality Programme",
    description: /current public status/,
    canonical: "https://www.enterprisereality.org/about/",
  },
];

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
  await expect(page.locator(".status-badge--released").first()).toContainText(
    /Status:\s*Released/,
  );
  await expect(page.locator(".status-badge--planned").first()).toContainText(
    /Status:\s*Planned/,
  );
  await expect(
    page.getByRole("link", { name: "Explore the Architecture" }),
  ).toHaveAttribute("href", "/platform/");
  await expect(
    page.getByRole("link", { name: "Why Enterprise Reality" }).first(),
  ).toHaveAttribute("href", "/why-enterprise-reality/");
  expect(errors).toEqual([]);
});

test("core narrative routes expose canonical metadata and page headings", async ({
  page,
}) => {
  for (const route of coreRoutes) {
    await page.goto(route.path);
    await expect(page).toHaveTitle(route.title);
    await expect(page.locator("meta[name='description']")).toHaveAttribute(
      "content",
      route.description,
    );
    await expect(page.locator("meta[property='og:url']")).toHaveAttribute(
      "content",
      route.canonical,
    );
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
      "href",
      route.canonical,
    );
    await expect(
      page.getByRole("heading", { level: 1, name: route.heading }),
    ).toBeVisible();
  }
});

test("core routes expose consistent structured metadata", async ({ page }) => {
  for (const route of coreRoutes) {
    await page.goto(route.path);

    const structuredDataText = await page
      .locator("script[type='application/ld+json']")
      .textContent();
    expect(structuredDataText).toBeTruthy();

    const structuredData = JSON.parse(structuredDataText ?? "{}") as {
      "@context"?: string;
      "@graph"?: Array<Record<string, unknown>>;
    };
    const graph = structuredData["@graph"] ?? [];
    const types = graph.map((item) => item["@type"]);

    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
    expect(types).toContain("WebPage");

    const webPage = graph.find((item) => item["@type"] === "WebPage");
    expect(webPage).toMatchObject({
      url: route.canonical,
      name: route.title,
    });

    const breadcrumbs = graph.filter(
      (item) => item["@type"] === "BreadcrumbList",
    );
    expect(breadcrumbs).toHaveLength(route.path === "/" ? 0 : 1);
  }
});

test("required public statements are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Understand before change.")).toBeVisible();
  await expect(page.getByText("Applications and Events")).toBeVisible();
  await expect(
    page.getByText("Authorised Action", { exact: true }),
  ).toBeVisible();

  await page.goto("/why-enterprise-reality/");
  await expect(
    page.getByText(
      "An enterprise should never automate what it does not first understand",
    ),
  ).toBeVisible();

  await page.goto("/constitution-driven-engineering/");
  await expect(page.getByText("Domain-Driven Design")).toBeVisible();
  await expect(page.getByText("Test-Driven Development")).toBeVisible();

  await page.goto("/about/");
  await expect(
    page.getByRole("heading", { level: 2, name: "Sheriff Oyekanmi" }),
  ).toBeVisible();
});

test("custom 404 page loads", async ({ page }) => {
  await page.goto("/404/");
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
  await expect(
    navigation.getByRole("link", { name: "Why Enterprise Reality" }),
  ).toHaveAttribute("href", "/why-enterprise-reality/");
  await expect(
    navigation.getByRole("link", { name: "Platform" }),
  ).toHaveAttribute("href", "/platform/");
  await expect(
    navigation.getByRole("link", { name: "Architecture" }),
  ).toHaveAttribute("href", "/architecture/");
  await expect(
    navigation.getByRole("link", { name: "Research" }),
  ).toHaveAttribute("href", "/research/");
  await expect(
    navigation.getByRole("link", {
      name: "Constitution-Driven Engineering",
    }),
  ).toHaveAttribute("href", "/constitution-driven-engineering/");
  await expect(navigation.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/about/",
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
  const hrefs = new Set<string>();

  for (const route of coreRoutes) {
    await page.goto(route.path);
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

test("core pages have no automated accessibility violations", async ({
  page,
}) => {
  for (const path of [...coreRoutes.map((route) => route.path), "/404/"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});

test("built output excludes drafts and prohibited private markers", () => {
  const index = readFileSync("dist/index.html", "utf8");
  expect(index).not.toContain("Foundation Architecture Demonstration");
  expect(index).not.toContain("customer reference");
  expect(index).not.toContain("production deployment");

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
