import { z } from 'zod';

// Password validation schema with strength requirements
export const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Login form validation schema
export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});
export type LoginFormData = z.infer<typeof LoginFormSchema>;

// Signup form validation schema
export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: PasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    organization: z
      .string()
      .max(100, 'Organization name must be less than 100 characters')
      .optional(),
    industry: z
      .string()
      .max(50, 'Industry must be less than 50 characters')
      .optional(),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, 'You must accept the terms and conditions'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type SignupFormData = z.infer<typeof SignupFormSchema>;

// JWT token payload schema
export const JWTPayloadSchema = z.object({
  sub: z.string(), // user ID
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
  iat: z.number(), // issued at
  exp: z.number(), // expires at
  jti: z.string(), // JWT ID
});
export type JWTPayload = z.infer<typeof JWTPayloadSchema>;

// Authentication response schema
export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    role: z.string(),
    organization: z.string().optional(),
    industry: z.string().optional(),
    emailVerified: z.boolean(),
    onboardingCompleted: z.boolean(),
    createdAt: z.string(),
    lastLoginAt: z.string().optional(),
  }),
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresAt: z.string(),
  }),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// Session data schema
export const SessionDataSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
  lastActivity: z.date(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});
export type SessionData = z.infer<typeof SessionDataSchema>;

// Authentication error schema
export const AuthErrorSchema = z.object({
  code: z.enum([
    'INVALID_CREDENTIALS',
    'ACCOUNT_LOCKED',
    'EMAIL_NOT_VERIFIED',
    'TOKEN_EXPIRED',
    'TOKEN_INVALID',
    'RATE_LIMITED',
    'USER_NOT_FOUND',
    'EMAIL_ALREADY_EXISTS',
    'WEAK_PASSWORD',
    'NETWORK_ERROR',
    'UNKNOWN_ERROR',
  ]),
  message: z.string(),
  details: z.any().optional(),
  timestamp: z.string(),
});
export type AuthError = z.infer<typeof AuthErrorSchema>;

// Password reset schema
export const PasswordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});
export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>;

export const PasswordResetSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: PasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type PasswordReset = z.infer<typeof PasswordResetSchema>;