import type { CollectionEntry } from "astro:content";

export type ResearchPublication = CollectionEntry<"research">;

export function visibleResearchPublications(
  publications: ResearchPublication[],
): ResearchPublication[] {
  return publications
    .filter((publication) => !publication.data.draft)
    .sort((a, b) => {
      const aTime = a.data.publicationDate?.getTime() ?? 0;
      const bTime = b.data.publicationDate?.getTime() ?? 0;

      if (aTime !== bTime) {
        return bTime - aTime;
      }

      return a.data.id.localeCompare(b.data.id);
    });
}

export function readingTimeForWords(text?: string): string {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));

  return `${minutes} min read`;
}

export function publicationSlug(publication: ResearchPublication): string {
  return publication.data.canonicalPath
    .replace(/^\/research\/publications\//, "")
    .replace(/\/$/, "");
}
