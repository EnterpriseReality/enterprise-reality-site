import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import {
  findDuplicateIdentifiers,
  validateContentMetadata,
} from "../../src/utilities/content-rules";
import { isDraftVisibleInProduction } from "../../src/utilities/status";

function readFrontmatter(path: string): Record<string, unknown> {
  const content = readFileSync(path, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    throw new Error(`Missing frontmatter: ${path}`);
  }

  return YAML.parse(match[1]);
}

function contentFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory()) {
      return contentFiles(path);
    }

    return path.endsWith(".md") ? [path] : [];
  });
}

describe("content governance rules", () => {
  it("keeps draft demonstration content out of production visibility", () => {
    expect(isDraftVisibleInProduction(true)).toBe(false);
    expect(isDraftVisibleInProduction(false)).toBe(true);
  });

  it("rejects invalid capability status and private canonical paths", () => {
    expect(
      validateContentMetadata(
        {
          id: "studio",
          status: "Available",
          canonicalPath: "/engineering-backlog/studio",
          draft: true,
        },
        "capability",
      ),
    ).toEqual([
      "status is not accepted",
      "canonicalPath exposes a private or source-only path",
    ]);
  });

  it("detects duplicate content identifiers", () => {
    expect(
      findDuplicateIdentifiers([{ id: "A" }, { id: "B" }, { id: "A" }]),
    ).toEqual(["A"]);
  });

  it("validates all demonstration content metadata", () => {
    const files = contentFiles("src/content");
    const metadata = files.map(readFrontmatter);

    expect(findDuplicateIdentifiers(metadata)).toEqual([]);
    for (const item of metadata) {
      const kind =
        typeof item.version === "string" ? "publication" : "capability";
      expect(validateContentMetadata(item, kind)).toEqual([]);
      expect(item.draft).toBe(true);
    }
  });

  it("passes the public/private marker check independently", () => {
    const result = execFileSync(
      "node",
      ["scripts/check-public-boundary.mjs", "src", "public"],
      {
        encoding: "utf8",
      },
    );

    expect(result).toContain("Public/private boundary check passed");
  });
});
