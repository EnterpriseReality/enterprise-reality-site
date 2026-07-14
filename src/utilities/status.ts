export const capabilityStatuses = [
  "Released",
  "In Development",
  "Planned",
  "Research",
  "Concept",
] as const;

export const publicationStatuses = [
  "Draft",
  "Editorial Review",
  "Architectural Review",
  "Approved",
  "Published",
  "Withdrawn",
] as const;

export type CapabilityStatus = (typeof capabilityStatuses)[number];
export type PublicationStatus = (typeof publicationStatuses)[number];

export function isDraftVisibleInProduction(draft: boolean): boolean {
  return !draft;
}
