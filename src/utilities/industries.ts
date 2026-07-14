export interface IndustryScenario {
  slug: string;
  title: string;
  sector: string;
  scenario: string;
  description: string;
  trigger: string;
  fragmentedState: string;
  evidence: string[];
  reasoning: string;
  actionProposal: string;
  accountability: string;
  value: string;
  diagramNodes: string[];
  highlight?: string;
}

export const constitutionalSummaryText =
  "Enterprise Reality does not replace the operational systems used within this industry. It establishes a governed constitutional layer that enables consistent representation, explainable reasoning, justified decisions and authorised action across those systems.";

export const constitutionalClosingLine = "Understand before change.";

export const industryScenarios: IndustryScenario[] = [
  {
    slug: "housing",
    title: "Housing",
    sector: "Housing",
    scenario: "Damp and Mould",
    description:
      "An illustrative housing scenario showing how Enterprise Reality governs representation, evidence, reasoning and action proposals without replacing housing systems.",
    trigger:
      "A resident reports damp and mould affecting a property and asks the landlord to respond.",
    fragmentedState:
      "Resident, tenancy, property, repair history, inspection notes, vulnerability information and policy requirements may sit in different operational systems with different identifiers and partial evidence.",
    evidence: [
      "Resident identity",
      "Property identity",
      "Tenancy relationship",
      "Inspection observations",
      "Repair history",
      "Vulnerability evidence",
      "Housing policy",
      "Prior decisions",
      "Decision authority",
    ],
    reasoning:
      "Governed reasoning relates resident, tenancy and property identities, resolves inspection and vulnerability evidence, evaluates policy and returns Satisfied, Not Satisfied or Indeterminate with an explanation.",
    actionProposal:
      "A governed response may propose escalation, inspection, repair scheduling, referral or approval review. It is a proposal for accountable handling, not automatic execution.",
    accountability:
      "Housing officers, surveyors and other accountable decision makers retain regulated judgement. Enterprise Reality supports reviewable understanding and does not replace professional responsibility.",
    value:
      "The organisation gains consistency, traceability, explainability, governed automation options, cross-system understanding and improved auditability.",
    diagramNodes: [
      "Resident",
      "Property",
      "Tenancy",
      "Inspection",
      "Repair",
      "Vulnerability",
      "Policy",
      "Decision",
      "Action Proposal",
      "Authority",
      "Execution",
    ],
    highlight:
      "Enterprise Reality identifies the resident, tenancy and property, resolves inspection and vulnerability evidence, evaluates policy, explains the reasoning, produces a governed Action Proposal and preserves human accountability.",
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    sector: "Financial Services",
    scenario: "Mortgage Affordability",
    description:
      "An illustrative mortgage affordability scenario focused on governed identity, income evidence, obligations, property context and explainable recommendation.",
    trigger:
      "A customer submits a mortgage application requiring affordability assessment.",
    fragmentedState:
      "Identity, income, liabilities, property details, policy rules and prior interactions can be distributed across application, document, credit, risk and servicing systems.",
    evidence: [
      "Customer identity",
      "Income evidence",
      "Financial obligations",
      "Property details",
      "Policy criteria",
      "Authority",
      "Prior decisions",
    ],
    reasoning:
      "Governed reasoning evaluates whether the identity, income evidence, obligations and property context satisfy the relevant affordability policy, or whether the result remains indeterminate.",
    actionProposal:
      "The platform may propose approval review, rejection review, evidence request, investigation or referral for accountable assessment.",
    accountability:
      "Underwriting and regulated lending judgement remain with accountable people and approved policies. Enterprise Reality provides an explainable recommendation path.",
    value:
      "Teams can apply policy more consistently, trace evidence to outcomes and audit the reasoning behind recommendations.",
    diagramNodes: [
      "Applicant",
      "Income",
      "Obligations",
      "Property",
      "Policy",
      "Reasoning",
      "Recommendation",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    sector: "Healthcare",
    scenario: "Patient Escalation",
    description:
      "An illustrative healthcare scenario showing governed clinical evidence, observations, pathway policy and explainability without replacing clinical decision makers.",
    trigger:
      "A patient referral or clinical escalation requires review against care pathway criteria.",
    fragmentedState:
      "Patient identity, observations, referral notes, pathway rules, care-team responsibilities and prior decisions may be held across disconnected clinical and administrative systems.",
    evidence: [
      "Patient identity",
      "Clinical observations",
      "Referral event",
      "Care pathway",
      "Clinical policy",
      "Responsible authority",
      "Prior decisions",
    ],
    reasoning:
      "Governed reasoning evaluates the relationship between clinical observations, the care pathway and policy criteria, producing an explainable Satisfied, Not Satisfied or Indeterminate outcome.",
    actionProposal:
      "A governed proposal may recommend escalation review, evidence request, referral routing or scheduling for clinical consideration.",
    accountability:
      "Clinical judgement remains with accountable clinicians and care governance. Enterprise Reality does not diagnose, prescribe or replace clinical decision making.",
    value:
      "The scenario supports more traceable pathway handling, clearer evidence gaps and reviewable escalation rationale.",
    diagramNodes: [
      "Patient",
      "Referral",
      "Observations",
      "Care Pathway",
      "Policy",
      "Explanation",
      "Clinical Review",
    ],
  },
  {
    slug: "government",
    title: "Government",
    sector: "Government",
    scenario: "Citizen Service Eligibility",
    description:
      "An illustrative public service eligibility scenario focused on identity, entitlement, supporting evidence, policy and explainable outcome.",
    trigger:
      "A citizen applies for a regulated service and the public body must determine eligibility.",
    fragmentedState:
      "Citizen identity, entitlement rules, evidence documents, prior applications, authority and service policies may be fragmented across case, identity and records systems.",
    evidence: [
      "Citizen identity",
      "Entitlement criteria",
      "Supporting evidence",
      "Application event",
      "Policy",
      "Authority",
      "Prior decisions",
    ],
    reasoning:
      "Governed reasoning checks identity, entitlement relationships and supporting evidence against policy, exposing whether the eligibility condition is satisfied, not satisfied or indeterminate.",
    actionProposal:
      "The platform may propose approval, rejection review, evidence request, investigation or referral to a responsible officer.",
    accountability:
      "Public authority and administrative judgement remain with accountable decision makers. Enterprise Reality supports transparent review and explanation.",
    value:
      "The organisation can improve consistency, traceability and auditability across service decisions without replacing statutory accountability.",
    diagramNodes: [
      "Citizen",
      "Application",
      "Entitlement",
      "Evidence",
      "Policy",
      "Outcome",
      "Officer Review",
    ],
  },
  {
    slug: "insurance",
    title: "Insurance",
    sector: "Insurance",
    scenario: "Claims Assessment",
    description:
      "An illustrative claims assessment scenario focused on policy, events, supporting evidence, review indicators and governed recommendation without treating AI as an authority.",
    trigger:
      "A policyholder submits a claim notification following an insured event.",
    fragmentedState:
      "Policy cover, event records, supporting evidence, claimant history, indicators requiring review and claims authority may be held across separate systems.",
    evidence: [
      "Policy identity",
      "Claim event",
      "Supporting evidence",
      "Coverage terms",
      "Review indicators",
      "Authority",
      "Prior decisions",
    ],
    reasoning:
      "Governed reasoning evaluates the policy relationship, event evidence, coverage terms and review indicators to explain whether the claim condition is satisfied, not satisfied or indeterminate.",
    actionProposal:
      "A governed proposal may recommend approval review, rejection review, investigation, evidence request or referral. It does not claim autonomous fraud judgement.",
    accountability:
      "Claims handlers, investigators and regulated decision makers remain responsible for judgement and approval.",
    value:
      "Claims handling can become more explainable, consistent and auditable across fragmented evidence sources.",
    diagramNodes: [
      "Policyholder",
      "Policy",
      "Event",
      "Evidence",
      "Review Indicators",
      "Recommendation",
      "Claims Authority",
    ],
  },
  {
    slug: "energy-and-petroleum",
    title: "Energy and Petroleum",
    sector: "Energy and Petroleum",
    scenario: "Cargo Transfer Assurance",
    description:
      "An illustrative cargo transfer assurance scenario showing governed understanding of vessel, cargo, tank, measurement, inspection, maintenance and operational policy before an Action Proposal or authorised execution is considered.",
    trigger:
      "A cargo transfer, custody transfer, maintenance, inspection or operational safety event requires governed assurance before an Action Proposal is made.",
    fragmentedState:
      "Vessel, cargo, tank, measurement, inspection, maintenance and policy records may be distributed across operational, asset and assurance systems with different identifiers.",
    evidence: [
      "Vessel identity",
      "Cargo identity",
      "Tank identity",
      "Measurement observations",
      "Inspection records",
      "Maintenance evidence",
      "Operational policy",
      "Authority",
    ],
    reasoning:
      "Governed reasoning establishes relationships between vessel, cargo, tank and measurement evidence, evaluates inspection and maintenance status against operational policy and explains the outcome before any Action Proposal.",
    actionProposal:
      "A governed proposal may recommend approval review, escalation, investigation, inspection, maintenance review or operational hold for accountable handling.",
    accountability:
      "Operational, safety and assurance authorities remain responsible for judgement. Enterprise Reality establishes governed understanding before any Action Proposal, approval or execution authority.",
    value:
      "The organisation gains a clearer audit trail across operational evidence, policy and authority while preserving source-system ownership.",
    diagramNodes: [
      "Vessel",
      "Cargo",
      "Tank",
      "Measurement",
      "Inspection",
      "Maintenance",
      "Operational Policy",
      "Action Proposal",
    ],
  },
];

export const getIndustryScenario = (slug: string): IndustryScenario => {
  const scenario = industryScenarios.find((item) => item.slug === slug);

  if (!scenario) {
    throw new Error(`Unknown industry scenario: ${slug}`);
  }

  return scenario;
};
