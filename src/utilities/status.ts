export const capabilityStatuses = [
  "Released",
  "In Development",
  "Planned",
  "Research",
  "Concept",
] as const;

export const publicationStatuses = [
  "Released",
  "In Development",
  "Research",
  "Concept",
] as const;

export type CapabilityStatus = (typeof capabilityStatuses)[number];
export type PublicationStatus = (typeof publicationStatuses)[number];

export function isDraftVisibleInProduction(draft: boolean): boolean {
  return !draft;
}
