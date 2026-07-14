import type { CapabilityStatus } from "./status";

export interface ProgrammeMilestone {
  version: string;
  title: string;
  status: CapabilityStatus;
  summary: string;
}

export interface CapabilityStage {
  title: string;
  status: CapabilityStatus;
  contribution: string;
}

export const programmeMilestones: ProgrammeMilestone[] = [
  {
    version: "v0.1.0",
    title: "Metadata Foundation",
    status: "Released",
    summary:
      "Established governed publication metadata as the identity and lifecycle foundation for the programme.",
  },
  {
    version: "v0.2.0",
    title: "Metadata Platform",
    status: "Released",
    summary:
      "Moved metadata interpretation into canonical platform capability rather than page-level or script-level parsing.",
  },
  {
    version: "v0.3.0",
    title: "Enterprise Corpus",
    status: "Released",
    summary:
      "Represented the governed body of knowledge as a discoverable corpus with stable publication references.",
  },
  {
    version: "v0.4.0",
    title: "Enterprise Reality Graph",
    status: "Released",
    summary:
      "Introduced governed relationships between stable identities as the basis for constitutional representation.",
  },
  {
    version: "v0.5.0",
    title: "Enterprise Reasoning Engine",
    status: "Released",
    summary:
      "Added deterministic reasoning over governed relationships and evidence, with explicit outcomes and explanation.",
  },
  {
    version: "v0.6.0",
    title: "Enterprise Automation Engine",
    status: "Released",
    summary:
      "Extended justified reasoning into governed action proposals, authority checks and execution records.",
  },
];

export const releasedPlatformFoundations: CapabilityStage[] = [
  {
    title: "Metadata Foundation",
    status: "Released",
    contribution:
      "Established governed publication metadata as the foundation for stable identity and lifecycle status.",
  },
  {
    title: "Metadata Platform",
    status: "Released",
    contribution:
      "Centralised metadata interpretation as a canonical platform capability.",
  },
  {
    title: "Enterprise Corpus",
    status: "Released",
    contribution:
      "Made the governed body of knowledge discoverable as a corpus of stable publication references.",
  },
  {
    title: "Enterprise Reality Graph",
    status: "Released",
    contribution:
      "Introduced governed relationships between stable identities.",
  },
  {
    title: "Enterprise Reasoning Engine",
    status: "Released",
    contribution:
      "Added deterministic reasoning over governed relationships and evidence.",
  },
  {
    title: "Enterprise Automation Engine",
    status: "Released",
    contribution:
      "Added governed action proposals, authority checks and execution records after justified reasoning.",
  },
];

export const nextPlatformStage: CapabilityStage = {
  title: "Operational Readiness",
  status: "Planned",
  contribution:
    "The next platform stage is planned work to prepare released foundations for operational use without implying active delivery, dates or commitment.",
};

export const futureProductDirection: CapabilityStage[] = [
  {
    title: "Decision Services",
    status: "Planned",
    contribution:
      "Will expose governed decision capabilities without bypassing evidence, policy or authority.",
  },
  {
    title: "Explorer",
    status: "Planned",
    contribution:
      "Will provide navigable public and practitioner views over governed knowledge and relationships.",
  },
  {
    title: "Assistant",
    status: "Research",
    contribution:
      "Investigates assistive retrieval and explanation while preserving the boundary between assistance and authority.",
  },
];

export const futureCapabilities = futureProductDirection;

export const capabilityProgression: CapabilityStage[] = [
  ...releasedPlatformFoundations,
  nextPlatformStage,
  ...futureProductDirection,
];

export const roadmapPrinciples = [
  "Truth before Technique.",
  "Understand before change.",
  "Represent reality faithfully.",
  "Resolve evidence explicitly.",
  "Conclude only what is justified.",
  "Act only when justified and permitted.",
  "Explain before acting.",
];
