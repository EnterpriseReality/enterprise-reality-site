import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { capabilityStatuses, publicationStatuses } from "./utilities/status";

const canonicalPath = z
  .string()
  .regex(
    /^\/[a-z0-9][a-z0-9/-]*$/,
    "Canonical paths must be clean public paths.",
  );

const publicPath = z
  .string()
  .refine(
    (value) =>
      !value.includes(".codex") &&
      !value.includes("engineering-backlog") &&
      !value.includes("source-material"),
    "Private or source-only paths must not be exposed.",
  );

const basePublicationSchema = z.object({
  id: z.string().regex(/^[A-Z0-9-]+$/),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  version: z.string().regex(/^\d+\.\d+(\.\d+)?$/),
  status: z.enum(publicationStatuses),
  category: z.string().min(1),
  summary: z.string().min(1),
  publicationDate: z.date().optional(),
  updatedDate: z.date().optional(),
  author: z.string().min(1),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
  canonicalPath: canonicalPath.pipe(publicPath),
  relatedPublications: z.array(z.string().regex(/^[A-Z0-9-]+$/)).default([]),
});

const capabilitySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  status: z.enum(capabilityStatuses),
  summary: z.string().min(1),
  canonicalPath: canonicalPath.pipe(publicPath),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
});

const architecture = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/architecture" }),
  schema: basePublicationSchema,
});
const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: basePublicationSchema,
});
const releases = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/releases" }),
  schema: basePublicationSchema,
});
const roadmap = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/roadmap" }),
  schema: capabilitySchema,
});
const industries = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/industries" }),
  schema: basePublicationSchema,
});

export const collections = {
  architecture,
  research,
  releases,
  roadmap,
  industries,
};
