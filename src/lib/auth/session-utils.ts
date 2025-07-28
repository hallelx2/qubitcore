import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { SessionData, SessionDataSchema } from '@/types/auth';
import { isTokenExpired, shouldRefreshToken } from './jwt-utils';

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: false, // Client-side access needed for auth store
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

const ACCESS_TOKEN_COOKIE = 'auth_access_token';
const REFRESH_TOKEN_COOKIE = 'auth_refresh_token';
const SESSION_DATA_COOKIE = 'auth_session_data';

/**
 * Store session data in cookies
 */
export function storeSession(sessionData: SessionData): void {
  try {
    // Store tokens in separate cookies
    setCookie(ACCESS_TOKEN_COOKIE, sessionData.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24, // 24 hours
    });

    setCookie(REFRESH_TOKEN_COOKIE, sessionData.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Store session metadata (without tokens for security)
    const sessionMetadata = {
      userId: sessionData.userId,
      email: sessionData.email,
      name: sessionData.name,
      role: sessionData.role,
      expiresAt: sessionData.expiresAt,
      lastActivity: sessionData.lastActivity,
    };

    setCookie(SESSION_DATA_COOKIE, JSON.stringify(sessionMetadata), {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24, // 24 hours
    });
  } catch (error) {
    console.error('Failed to store session:', error);
    throw new Error('Failed to store session data');
  }
}

/**
 * Retrieve session data from cookies
 */
export function getStoredSession(): SessionData | null {
  try {
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
    const refreshToken = getCookie(REFRESH_TOKEN_COOKIE);
    const sessionDataCookie = getCookie(SESSION_DATA_COOKIE);

    if (!accessToken || !refreshToken || !sessionDataCookie) {
      return null;
    }

    const sessionMetadata = JSON.parse(sessionDataCookie as string);
    
    const sessionData: SessionData = {
      ...sessionMetadata,
      accessToken: accessToken as string,
      refreshToken: refreshToken as string,
      expiresAt: new Date(sessionMetadata.expiresAt),
      lastActivity: new Date(sessionMetadata.lastActivity),
    };

    // Validate the session data structure
    return SessionDataSchema.parse(sessionData);
  } catch (error) {
    console.error('Failed to retrieve session:', error);
    clearStoredSession(); // Clear invalid session data
    return null;
  }
}

/**
 * Clear all session data from cookies
 */
export function clearStoredSession(): void {
  try {
    deleteCookie(ACCESS_TOKEN_COOKIE);
    deleteCookie(REFRESH_TOKEN_COOKIE);
    deleteCookie(SESSION_DATA_COOKIE);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
}

/**
 * Update last activity timestamp in session
 */
export function updateSessionActivity(): void {
  const session = getStoredSession();
  if (session) {
    const updatedSession = {
      ...session,
      lastActivity: new Date(),
    };
    storeSession(updatedSession);
  }
}

/**
 * Check if stored session is valid
 */
export function isStoredSessionValid(): boolean {
  const session = getStoredSession();
  if (!session) return false;

  // Check if access token is expired
  if (isTokenExpired(session.accessToken)) {
    return false;
  }

  // Check if session has expired based on expiresAt
  const now = new Date();
  if (now >= session.expiresAt) {
    return false;
  }

  return true;
}

/**
 * Check if stored session should be refreshed
 */
export function shouldRefreshStoredSession(): boolean {
  const session = getStoredSession();
  if (!session) return false;

  return shouldRefreshToken(session.accessToken);
}

/**
 * Get access token from storage
 */
export function getAccessToken(): string | null {
  try {
    return getCookie(ACCESS_TOKEN_COOKIE) as string || null;
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
}

/**
 * Get refresh token from storage
 */
export function getRefreshToken(): string | null {
  try {
    return getCookie(REFRESH_TOKEN_COOKIE) as string || null;
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
}

/**
 * Set access token in storage
 */
export function setAccessToken(accessToken: string): void {
  try {
    setCookie(ACCESS_TOKEN_COOKIE, accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24, // 24 hours
    });
  } catch (error) {
    console.error('Failed to set access token:', error);
    throw new Error('Failed to set access token');
  }
}

/**
 * Set refresh token in storage
 */
export function setRefreshToken(refreshToken: string): void {
  try {
    setCookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error) {
    console.error('Failed to set refresh token:', error);
    throw new Error('Failed to set refresh token');
  }
}

/**
 * Update access token in storage
 */
export function updateAccessToken(newAccessToken: string, expiresAt: Date): void {
  try {
    setCookie(ACCESS_TOKEN_COOKIE, newAccessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24, // 24 hours
    });

    // Update session data with new expiration
    const session = getStoredSession();
    if (session) {
      const updatedSession = {
        ...session,
        accessToken: newAccessToken,
        expiresAt,
        lastActivity: new Date(),
      };
      storeSession(updatedSession);
    }
  } catch (error) {
    console.error('Failed to update access token:', error);
    throw new Error('Failed to update access token');
  }
}

/**
 * Get session expiration info
 */
export function getSessionExpirationInfo(): {
  expiresAt: Date | null;
  timeUntilExpiry: number;
  isExpired: boolean;
  shouldRefresh: boolean;
} {
  const session = getStoredSession();
  
  if (!session) {
    return {
      expiresAt: null,
      timeUntilExpiry: 0,
      isExpired: true,
      shouldRefresh: false,
    };
  }

  const now = new Date();
  const timeUntilExpiry = Math.max(0, session.expiresAt.getTime() - now.getTime());
  const isExpired = timeUntilExpiry === 0;
  const shouldRefresh = !isExpired && shouldRefreshToken(session.accessToken);

  return {
    expiresAt: session.expiresAt,
    timeUntilExpiry,
    isExpired,
    shouldRefresh,
  };
}