import { capabilityStatuses, publicationStatuses } from "./status";

export interface ContentMetadata {
  id?: unknown;
  status?: unknown;
  canonicalPath?: unknown;
  draft?: unknown;
}

const canonicalPathPattern = /^\/[a-z0-9][a-z0-9/-]*$/;
const privatePathMarkers = [".codex", "engineering-backlog", "source-material"];

export function validateContentMetadata(
  metadata: ContentMetadata,
  kind: "publication" | "capability",
): string[] {
  const errors: string[] = [];

  if (typeof metadata.id !== "string" || metadata.id.length === 0) {
    errors.push("id is required");
  }

  const acceptedStatuses =
    kind === "capability" ? capabilityStatuses : publicationStatuses;

  if (
    typeof metadata.status !== "string" ||
    !acceptedStatuses.includes(metadata.status as never)
  ) {
    errors.push("status is not accepted");
  }

  if (
    typeof metadata.canonicalPath !== "string" ||
    !canonicalPathPattern.test(metadata.canonicalPath)
  ) {
    errors.push("canonicalPath must be a clean public path");
  }

  if (typeof metadata.canonicalPath === "string") {
    const path = metadata.canonicalPath;
    if (privatePathMarkers.some((marker) => path.includes(marker))) {
      errors.push("canonicalPath exposes a private or source-only path");
    }
  }

  if (typeof metadata.draft !== "boolean") {
    errors.push("draft flag is required");
  }

  return errors;
}

export function findDuplicateIdentifiers(items: ContentMetadata[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (typeof item.id !== "string") {
      continue;
    }

    if (seen.has(item.id)) {
      duplicates.add(item.id);
    }

    seen.add(item.id);
  }

  return [...duplicates].sort();
}
