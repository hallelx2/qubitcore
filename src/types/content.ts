import { z } from 'zod';
import { IndustrySchema, PlatformSchema } from './quantum';

// Educational content and articles
export const ArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  author: z.string(),
  publishedAt: z.date(),
  updatedAt: z.date(),
  tags: z.array(z.string()),
  category: z.enum(['threat-analysis', 'technical', 'case-study', 'industry', 'tutorial']),
  readingTime: z.number(),
  featured: z.boolean().default(false),
  platform: PlatformSchema.optional(),
  industry: IndustrySchema.optional(),
});
export type Article = z.infer<typeof ArticleSchema>;

// Interactive content and demos
export const InteractiveContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['demo', 'simulation', 'calculator', 'assessment']),
  platform: PlatformSchema.optional(),
  description: z.string(),
  config: z.record(z.string(), z.any()),
  completionTracking: z.boolean().default(false),
  prerequisites: z.array(z.string()).default([]),
});
export type InteractiveContent = z.infer<typeof InteractiveContentSchema>;

// Newsletter and email content
export const NewsletterSchema = z.object({
  id: z.string(),
  subject: z.string(),
  content: z.string(),
  scheduledAt: z.date(),
  sentAt: z.date().optional(),
  recipients: z.number(),
  openRate: z.number().optional(),
  clickRate: z.number().optional(),
  status: z.enum(['draft', 'scheduled', 'sent', 'cancelled']),
});
export type Newsletter = z.infer<typeof NewsletterSchema>;

// FAQ and help content
export const FAQSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  category: z.string(),
  platform: PlatformSchema.optional(),
  helpful: z.number().default(0),
  notHelpful: z.number().default(0),
  order: z.number().default(0),
});
export type FAQ = z.infer<typeof FAQSchema>;

// Resource downloads
export const ResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['whitepaper', 'guide', 'checklist', 'template', 'case-study']),
  fileUrl: z.string(),
  fileSize: z.number(),
  downloadCount: z.number().default(0),
  gated: z.boolean().default(true), // Requires email capture
  platform: PlatformSchema.optional(),
  industry: IndustrySchema.optional(),
  publishedAt: z.date(),
});
export type Resource = z.infer<typeof ResourceSchema>;