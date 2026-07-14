import { readFileSync } from "node:fs";
import YAML from "yaml";
import { describe, expect, it } from "vitest";

const origin = "https://www.enterprisereality.org";

function readText(path: string): string {
  return readFileSync(path, "utf8");
}

function readYaml(path: string): Record<string, unknown> {
  return YAML.parse(readText(path)) as Record<string, unknown>;
}

describe("WEB-1-RW1 acceptance repository rules", () => {
  it("defines the required route manifest and reserved absent research route", () => {
    const manifest = JSON.parse(
      readText("acceptance/website-v1/expected/route-manifest.json"),
    ) as { origin: string; routes: string[]; absentRoutes: string[] };

    expect(manifest.origin).toBe(origin);
    expect(manifest.routes).toEqual([
      "/",
      "/404/",
      "/why-enterprise-reality/",
      "/platform/",
      "/constitution-driven-engineering/",
      "/about/",
      "/architecture/",
      "/research/",
      "/research/publications/",
      "/industries/",
      "/industries/housing/",
      "/industries/financial-services/",
      "/industries/healthcare/",
      "/industries/government/",
      "/industries/insurance/",
      "/industries/energy-and-petroleum/",
      "/roadmap/",
    ]);
    expect(manifest.absentRoutes).toEqual(["/research/publications/errs-001/"]);
  });

  it("keeps Astro static generation and canonical origin aligned with CNAME", () => {
    const astroConfig = readText("astro.config.mjs");
    const cname = readText("public/CNAME").trim();
    const robots = readText("public/robots.txt");

    expect(cname).toBe("www.enterprisereality.org");
    expect(astroConfig).toContain(`site: "${origin}"`);
    expect(astroConfig).toContain('output: "static"');
    expect(robots).toContain(`Sitemap: ${origin}/sitemap-index.xml`);
  });

  it("keeps deployment workflows guarded and least privilege", () => {
    const deploy = readYaml(".github/workflows/deploy.yml");
    const quality = readYaml(".github/workflows/quality.yml");
    const deployText = readText(".github/workflows/deploy.yml");
    const qualityText = readText(".github/workflows/quality.yml");

    expect(deploy.permissions).toEqual({ contents: "read" });
    expect(quality.permissions).toEqual({ contents: "read" });
    expect(deployText).toContain("github.event_name == 'push'");
    expect(deployText).toContain("github.ref == 'refs/heads/main'");
    expect(deployText).toContain("actions/upload-pages-artifact@v4");
    expect(deployText).toContain("actions/deploy-pages@v4");
    expect(deployText).toContain("pages: write");
    expect(deployText).toContain("id-token: write");
    expect(deployText).not.toMatch(/\$\{\{\s*secrets\./);
    expect(qualityText).not.toContain("deploy-pages");
  });

  it("keeps unsupported runtime capabilities out of package dependencies", () => {
    const packageJson = JSON.parse(readText("package.json")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    for (const packageName of [
      "react",
      "vue",
      "svelte",
      "next",
      "express",
      "fastify",
      "graphql",
      "d3",
      "cytoscape",
      "three",
    ]) {
      expect(dependencies).not.toHaveProperty(packageName);
    }
  });

  it("records acceptance evidence without claiming deployment or certification", () => {
    const evidence = readText(
      "acceptance/website-v1/evidence/WEB-1-RW1-EVIDENCE.md",
    );

    expect(evidence).toMatch(/does not own new\s+public capability/);
    expect(evidence).toMatch(/do not claim full\s+WCAG certification/);
    expect(evidence).toMatch(/GitHub-hosted workflow\s+success is not claimed/);
    expect(evidence).toContain("Deployment approval");
  });
});
