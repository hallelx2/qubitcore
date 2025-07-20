import { z } from 'zod';

// Core quantum security types
export const PlatformSchema = z.enum(['shield', 'ledger', 'synapse', 'aegis']);
export type Platform = z.infer<typeof PlatformSchema>;

export const IndustrySchema = z.enum([
  'healthcare',
  'finance',
  'ai-research',
  'fintech',
  'banking',
  'insurance',
  'government',
  'education',
  'technology',
  'other'
]);
export type Industry = z.infer<typeof IndustrySchema>;

export const ThreatLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);
export type ThreatLevel = z.infer<typeof ThreatLevelSchema>;

export const UserTypeSchema = z.enum(['developer', 'enterprise', 'visitor', 'admin']);
export type UserType = z.infer<typeof UserTypeSchema>;

// Quantum threat assessment
export const ThreatAssessmentSchema = z.object({
  id: z.string(),
  industry: IndustrySchema,
  dataTypes: z.array(z.string()),
  currentSecurity: z.string(),
  dataLifespan: z.number(), // years
  threatLevel: ThreatLevelSchema,
  recommendations: z.array(z.string()),
  score: z.number().min(0).max(100),
  createdAt: z.date(),
});
export type ThreatAssessment = z.infer<typeof ThreatAssessmentSchema>;

// Platform-specific data
export const PlatformDataSchema = z.object({
  platform: PlatformSchema,
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  color: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
  useCases: z.array(z.string()),
  targetAudience: z.array(UserTypeSchema),
});
export type PlatformData = z.infer<typeof PlatformDataSchema>;

// Success metrics
export const MetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  change: z.number().optional(),
  trend: z.enum(['up', 'down', 'stable']).optional(),
});
export type Metric = z.infer<typeof MetricSchema>;

// Case study
export const CaseStudySchema = z.object({
  id: z.string(),
  company: z.string(),
  industry: IndustrySchema,
  platform: PlatformSchema,
  challenge: z.string(),
  solution: z.string(),
  results: z.array(MetricSchema),
  testimonial: z.string().optional(),
  publishedAt: z.date(),
  featured: z.boolean().default(false),
});
export type CaseStudy = z.infer<typeof CaseStudySchema>;

// API demonstration
export const APIDemoSchema = z.object({
  id: z.string(),
  platform: PlatformSchema,
  endpoint: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  description: z.string(),
  parameters: z.array(z.object({
    name: z.string(),
    type: z.string(),
    required: z.boolean(),
    description: z.string(),
  })),
  examples: z.array(z.object({
    language: z.string(),
    code: z.string(),
    response: z.string(),
  })),
});
export type APIDemo = z.infer<typeof APIDemoSchema>;

// Story content
export const StoryContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  platform: PlatformSchema.optional(),
  character: z.string().optional(),
  scenario: z.string(),
  problem: z.string(),
  solution: z.string(),
  outcome: z.string(),
  interactive: z.boolean().default(false),
});
export type StoryContent = z.infer<typeof StoryContentSchema>;