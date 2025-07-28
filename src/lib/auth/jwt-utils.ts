import { JWTPayload, JWTPayloadSchema } from '@/types/auth';

/**
 * Decode JWT token payload without verification
 * Note: This is for client-side token inspection only. 
 * Server-side verification should always be used for security.
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    );

    // Validate the payload structure
    const validatedPayload = JWTPayloadSchema.parse(decodedPayload);
    return validatedPayload;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload) return true;

  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

/**
 * Get token expiration time in milliseconds
 */
export function getTokenExpiration(token: string): number | null {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return payload.exp * 1000; // Convert to milliseconds
}

/**
 * Check if token should be refreshed (expires in less than 5 minutes)
 */
export function shouldRefreshToken(token: string): boolean {
  const expirationTime = getTokenExpiration(token);
  if (!expirationTime) return true;

  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  return (expirationTime - now) < fiveMinutes;
}

/**
 * Extract user information from JWT token
 */
export function getUserFromToken(token: string): {
  id: string;
  email: string;
  name: string;
  role: string;
} | null {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };
}

/**
 * Validate JWT token format (basic structure check)
 */
export function isValidJWTFormat(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  // Check if each part is base64url encoded
  const base64UrlRegex = /^[A-Za-z0-9_-]+$/;
  return parts.every(part => base64UrlRegex.test(part));
}

/**
 * Get time until token expiration in milliseconds
 */
export function getTimeUntilExpiration(token: string): number {
  const expirationTime = getTokenExpiration(token);
  if (!expirationTime) return 0;

  const now = Date.now();
  return Math.max(0, expirationTime - now);
}

/**
 * Format time until expiration in human-readable format
 */
export function formatTimeUntilExpiration(token: string): string {
  const timeLeft = getTimeUntilExpiration(token);
  if (timeLeft === 0) return 'Expired';

  const minutes = Math.floor(timeLeft / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  
  return 'Less than a minute';
}