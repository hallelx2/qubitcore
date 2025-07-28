"use client";

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { 
  getStoredSession, 
  isStoredSessionValid, 
  shouldRefreshStoredSession,
  clearStoredSession,
  updateSessionActivity 
} from './session-utils';

interface AuthContextType {
  // Re-export auth store methods for convenience
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  error: any;
  login: (user: any, session: any) => void;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authStore = useAuthStore();

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        authStore.setLoading(true);
        
        // Check if there's a valid stored session
        const storedSession = getStoredSession();
        if (storedSession && isStoredSessionValid()) {
          // Restore session from storage
          const user = {
            id: storedSession.userId,
            email: storedSession.email,
            name: storedSession.name,
            role: storedSession.role as 'developer' | 'enterprise' | 'visitor' | 'admin',
            createdAt: new Date(),
            emailVerified: true,
            onboardingCompleted: true,
          };
          
          authStore.login(user, storedSession);
          
          // Check if token should be refreshed
          if (shouldRefreshStoredSession()) {
            // TODO: Implement token refresh logic when API is available
            console.log('Token should be refreshed');
          }
        } else {
          // Clear invalid session
          clearStoredSession();
          authStore.logout();
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        clearStoredSession();
        authStore.logout();
      } finally {
        authStore.setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Update activity on user interaction
  useEffect(() => {
    const updateActivity = () => {
      if (authStore.isAuthenticated) {
        updateSessionActivity();
        authStore.updateLastActivity();
      }
    };

    // Update activity on various user interactions
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, [authStore.isAuthenticated]);

  // Session validation interval
  useEffect(() => {
    if (!authStore.isAuthenticated) return;

    const interval = setInterval(() => {
      if (!isStoredSessionValid()) {
        console.log('Session expired, logging out');
        clearStoredSession();
        authStore.logout();
      } else if (shouldRefreshStoredSession()) {
        // TODO: Implement token refresh logic when API is available
        console.log('Token should be refreshed');
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [authStore.isAuthenticated]);

  const contextValue: AuthContextType = {
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    user: authStore.user,
    error: authStore.error,
    login: authStore.login,
    logout: () => {
      clearStoredSession();
      authStore.logout();
    },
    clearError: authStore.clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// Hook for checking authentication status
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page
      window.location.href = '/login';
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}