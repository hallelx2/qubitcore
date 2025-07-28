import axios, { AxiosInstance, AxiosError } from 'axios';
import { 
  LoginFormData, 
  SignupFormData, 
  AuthResponse, 
  AuthError, 
  PasswordResetRequest,
  PasswordReset,
  AuthResponseSchema,
  AuthErrorSchema 
} from '@/types/auth';
import { getAccessToken, getRefreshToken } from './session-utils';

// Authentication API Client Configuration
interface AuthAPIConfig {
  baseURL?: string;
  timeout?: number;
  enableLogging?: boolean;
}

class AuthAPIClient {
  private client: AxiosInstance;
  private config: AuthAPIConfig;

  constructor(config: AuthAPIConfig = {}) {
    this.config = {
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.qubitcore.com/v1',
      timeout: 10000,
      enableLogging: process.env.NODE_ENV === 'development',
      ...config
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'QubitCore-Auth/1.0.0'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - add auth token if available
    this.client.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token && !config.url?.includes('/auth/')) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (this.config.enableLogging) {
          console.log(`[Auth API] ${config.method?.toUpperCase()} ${config.url}`);
        }
        
        return config;
      },
      (error) => {
        if (this.config.enableLogging) {
          console.error('[Auth API] Request error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle auth errors
    this.client.interceptors.response.use(
      (response) => {
        if (this.config.enableLogging) {
          console.log(`[Auth API] Response ${response.status}:`, response.data);
        }
        return response;
      },
      (error: AxiosError) => {
        if (this.config.enableLogging) {
          console.error('[Auth API] Response error:', error);
        }

        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
          // Clear stored session and redirect to login
          // This will be handled by the auth context
          window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private formatError(error: AxiosError): AuthError {
    // Try to parse the error response
    if (error.response?.data) {
      try {
        return AuthErrorSchema.parse(error.response.data);
      } catch {
        // Fallback if response doesn't match schema
      }
    }

    // Map common HTTP status codes to auth error codes
    const statusCode = error.response?.status;
    let code: AuthError['code'] = 'UNKNOWN_ERROR';
    let message = 'An unexpected error occurred';

    switch (statusCode) {
      case 400:
        code = 'INVALID_CREDENTIALS';
        message = 'Invalid request data';
        break;
      case 401:
        code = 'INVALID_CREDENTIALS';
        message = 'Invalid email or password';
        break;
      case 403:
        code = 'ACCOUNT_LOCKED';
        message = 'Account access denied';
        break;
      case 409:
        code = 'EMAIL_ALREADY_EXISTS';
        message = 'An account with this email already exists';
        break;
      case 422:
        code = 'WEAK_PASSWORD';
        message = 'Password does not meet security requirements';
        break;
      case 429:
        code = 'RATE_LIMITED';
        message = 'Too many requests. Please try again later';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        code = 'NETWORK_ERROR';
        message = 'Server error. Please try again later';
        break;
      default:
        if (!error.response) {
          code = 'NETWORK_ERROR';
          message = 'Network error. Please check your connection';
        }
    }

    return {
      code,
      message: (error.response?.data as any)?.message || message,
      details: (error.response?.data as any)?.details,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * User registration
   */
  async signup(data: SignupFormData): Promise<AuthResponse> {
    try {
      const response = await this.client.post('/auth/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
        organization: data.organization,
        industry: data.industry,
      });

      return AuthResponseSchema.parse(response.data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * User login
   */
  async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await this.client.post('/auth/login', {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      return AuthResponseSchema.parse(response.data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * User logout
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await this.client.post('/auth/logout', {
          refreshToken,
        });
      }
    } catch (error) {
      // Ignore logout errors - we'll clear local session anyway
      console.warn('Logout request failed:', error);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<{
    accessToken: string;
    expiresAt: string;
  }> {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await this.client.post('/auth/refresh', {
        refreshToken,
      });

      return {
        accessToken: response.data.accessToken,
        expiresAt: response.data.expiresAt,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(data: PasswordResetRequest): Promise<{
    message: string;
    resetTokenSent: boolean;
  }> {
    try {
      const response = await this.client.post('/auth/password-reset/request', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(data: PasswordReset): Promise<{
    message: string;
    passwordReset: boolean;
  }> {
    try {
      const response = await this.client.post('/auth/password-reset/confirm', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify email address
   */
  async verifyEmail(token: string): Promise<{
    message: string;
    emailVerified: boolean;
  }> {
    try {
      const response = await this.client.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Resend email verification
   */
  async resendEmailVerification(): Promise<{
    message: string;
    verificationSent: boolean;
  }> {
    try {
      const response = await this.client.post('/auth/verify-email/resend');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<{
    id: string;
    email: string;
    name: string;
    role: string;
    organization?: string;
    industry?: string;
    emailVerified: boolean;
    onboardingCompleted: boolean;
    createdAt: string;
    lastLoginAt?: string;
  }> {
    try {
      const response = await this.client.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(data: {
    name?: string;
    organization?: string;
    industry?: string;
  }): Promise<{
    message: string;
    user: any;
  }> {
    try {
      const response = await this.client.put('/auth/profile', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Change password
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{
    message: string;
    passwordChanged: boolean;
  }> {
    try {
      const response = await this.client.put('/auth/password', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete account
   */
  async deleteAccount(data: {
    password: string;
    confirmDeletion: boolean;
  }): Promise<{
    message: string;
    accountDeleted: boolean;
  }> {
    try {
      const response = await this.client.delete('/auth/account', { data });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Create singleton instance
export const authAPI = new AuthAPIClient();

// Export the class for testing or custom configurations
export { AuthAPIClient };