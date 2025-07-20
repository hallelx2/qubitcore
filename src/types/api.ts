import { z } from 'zod';
import { PlatformSchema } from './quantum';

// API Response wrapper
export const APIResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  timestamp: z.date(),
});
export type APIResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
};

// Authentication
export const AuthCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;

export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    role: z.string(),
  }),
  token: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// QubitCore API specific types
export const EncryptRequestSchema = z.object({
  data: z.string(),
  algorithm: z.string().optional(),
});
export type EncryptRequest = z.infer<typeof EncryptRequestSchema>;

export const EncryptResponseSchema = z.object({
  ciphertext: z.string(),
  keyId: z.string(),
  algorithm: z.string(),
  timestamp: z.date(),
});
export type EncryptResponse = z.infer<typeof EncryptResponseSchema>;

export const DecryptRequestSchema = z.object({
  ciphertext: z.string(),
  keyId: z.string(),
});
export type DecryptRequest = z.infer<typeof DecryptRequestSchema>;

export const DecryptResponseSchema = z.object({
  plaintext: z.string(),
  timestamp: z.date(),
});
export type DecryptResponse = z.infer<typeof DecryptResponseSchema>;

export const SignRequestSchema = z.object({
  data: z.string(),
  algorithm: z.string().optional(),
});
export type SignRequest = z.infer<typeof SignRequestSchema>;

export const SignResponseSchema = z.object({
  signature: z.string(),
  keyId: z.string(),
  algorithm: z.string(),
  timestamp: z.date(),
});
export type SignResponse = z.infer<typeof SignResponseSchema>;

export const VerifyRequestSchema = z.object({
  data: z.string(),
  signature: z.string(),
  keyId: z.string(),
});
export type VerifyRequest = z.infer<typeof VerifyRequestSchema>;

export const VerifyResponseSchema = z.object({
  valid: z.boolean(),
  timestamp: z.date(),
});
export type VerifyResponse = z.infer<typeof VerifyResponseSchema>;

// API Usage tracking
export const APIUsageSchema = z.object({
  userId: z.string(),
  apiKeyId: z.string(),
  platform: PlatformSchema,
  endpoint: z.string(),
  method: z.string(),
  statusCode: z.number(),
  responseTime: z.number(),
  timestamp: z.date(),
  ipAddress: z.string(),
  userAgent: z.string().optional(),
});
export type APIUsage = z.infer<typeof APIUsageSchema>;

// Error types
export const APIErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.any()).optional(),
  retryAfter: z.number().optional(),
  upgradeOptions: z.array(z.string()).optional(),
});
export type APIError = z.infer<typeof APIErrorSchema>;

// Rate limiting
export const RateLimitSchema = z.object({
  limit: z.number(),
  remaining: z.number(),
  reset: z.date(),
  retryAfter: z.number().optional(),
});
export type RateLimit = z.infer<typeof RateLimitSchema>;