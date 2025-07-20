import { z } from 'zod';
import { IndustrySchema, UserTypeSchema } from './quantum';

// User authentication and profile
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: UserTypeSchema,
  organization: z.string().optional(),
  industry: IndustrySchema.optional(),
  createdAt: z.date(),
  lastLoginAt: z.date().optional(),
  emailVerified: z.boolean().default(false),
  onboardingCompleted: z.boolean().default(false),
});
export type User = z.infer<typeof UserSchema>;

// API Key management
export const APIKeySchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  key: z.string(),
  permissions: z.array(z.string()),
  usageLimit: z.number(),
  usageCount: z.number().default(0),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  lastUsedAt: z.date().optional(),
  active: z.boolean().default(true),
});
export type APIKey = z.infer<typeof APIKeySchema>;

// User subscription and billing
export const SubscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  plan: z.enum(['free', 'developer', 'professional', 'enterprise']),
  status: z.enum(['active', 'cancelled', 'past_due', 'trialing']),
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
  cancelAtPeriodEnd: z.boolean().default(false),
  trialEnd: z.date().optional(),
});
export type Subscription = z.infer<typeof SubscriptionSchema>;

// User preferences and settings
export const UserPreferencesSchema = z.object({
  userId: z.string(),
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  emailNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  preferredLanguage: z.string().default('en'),
  timezone: z.string().default('UTC'),
  onboardingStep: z.number().default(0),
  completedTutorials: z.array(z.string()).default([]),
});
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

// User session and analytics
export const UserSessionSchema = z.object({
  sessionId: z.string(),
  userId: z.string().optional(),
  startTime: z.date(),
  endTime: z.date().optional(),
  ipAddress: z.string(),
  userAgent: z.string(),
  referrer: z.string().optional(),
  pages: z.array(z.object({
    path: z.string(),
    timestamp: z.date(),
    timeSpent: z.number().optional(),
  })),
  actions: z.array(z.object({
    type: z.string(),
    target: z.string(),
    timestamp: z.date(),
    metadata: z.record(z.string(), z.any()).optional(),
  })),
});
export type UserSession = z.infer<typeof UserSessionSchema>;