import type { CapabilityStatus } from "./status";

export interface PublicCapabilityState {
  id: string;
  label: string;
  maturity: CapabilityStatus;
  programmeStanding: string;
  publicAvailability: "Not claimed" | "Not publicly offered";
  authority: string;
}

export const publicCapabilities = {
  "governed-publications": {
    id: "governed-publications",
    label: "Governed Publications",
    maturity: "Released",
    programmeStanding: "Published programme foundation",
    publicAvailability: "Not claimed",
    authority: "ER-WEB-006",
  },
  "metadata-engine": {
    id: "metadata-engine",
    label: "Metadata Engine",
    maturity: "Released",
    programmeStanding: "Released programme foundation",
    publicAvailability: "Not claimed",
    authority: "ER-WEB-006",
  },
  "enterprise-corpus": {
    id: "enterprise-corpus",
    label: "Enterprise Corpus",
    maturity: "Released",
    programmeStanding: "Released programme foundation",
    publicAvailability: "Not claimed",
    authority: "ER-WEB-006",
  },
  "enterprise-reality-graph": {
    id: "enterprise-reality-graph",
    label: "Enterprise Reality Graph",
    maturity: "Released",
    programmeStanding: "Released programme foundation",
    publicAvailability: "Not claimed",
    authority: "ER-WEB-006",
  },
  "reasoning-engine": {
    id: "reasoning-engine",
    label: "Enterprise Reasoning Engine",
    maturity: "Released",
    programmeStanding: "Released programme foundation",
    publicAvailability: "Not claimed",
    authority: "ER-WEB-006",
  },
  "automation-engine": {
    id: "automation-engine",
    label: "Enterprise Automation Engine",
    maturity: "Released",
    programmeStanding: "Released programme foundation",
    publicAvailability: "Not claimed",
    authority: "ER-WEB-006",
  },
  "operational-readiness": {
    id: "operational-readiness",
    label: "Operational Readiness",
    maturity: "Implemented",
    programmeStanding: "Engineering complete; release certification pending",
    publicAvailability: "Not claimed",
    authority: "ER-WEB-006",
  },
  studio: {
    id: "studio",
    label: "Studio",
    maturity: "Planned",
    programmeStanding: "Planned programme direction",
    publicAvailability: "Not publicly offered",
    authority: "ER-WEB-006",
  },
  runtime: {
    id: "runtime",
    label: "Runtime",
    maturity: "In Development",
    programmeStanding: "Active programme development",
    publicAvailability: "Not publicly offered",
    authority: "ER-WEB-006",
  },
  "decision-services": {
    id: "decision-services",
    label: "Decision Services",
    maturity: "Planned",
    programmeStanding: "Planned programme direction",
    publicAvailability: "Not publicly offered",
    authority: "ER-WEB-006",
  },
  explorer: {
    id: "explorer",
    label: "Explorer",
    maturity: "In Development",
    programmeStanding:
      "Authorised product with implemented/demonstrated capability",
    publicAvailability: "Not publicly offered",
    authority: "ER-WEB-006",
  },
  connect: {
    id: "connect",
    label: "Connect",
    maturity: "Planned",
    programmeStanding: "Planned programme direction",
    publicAvailability: "Not publicly offered",
    authority: "ER-WEB-006",
  },
  assistant: {
    id: "assistant",
    label: "Assistant",
    maturity: "Research",
    programmeStanding: "Research direction",
    publicAvailability: "Not publicly offered",
    authority: "ER-WEB-006",
  },
  "ai-runtime": {
    id: "ai-runtime",
    label: "Enterprise AI Runtime",
    maturity: "Research",
    programmeStanding: "Research direction",
    publicAvailability: "Not publicly offered",
    authority: "ER-WEB-006",
  },
} as const satisfies Record<string, PublicCapabilityState>;

export type PublicCapabilityId = keyof typeof publicCapabilities;

export function capabilityState(id: PublicCapabilityId): PublicCapabilityState {
  return publicCapabilities[id];
}
