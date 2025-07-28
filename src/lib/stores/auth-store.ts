import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SessionData, AuthError } from '@/types/auth';
import { User } from '@/types/user';

interface AuthState {
  // Authentication state
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: SessionData | null;
  error: AuthError | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: AuthError | null) => void;
  setUser: (user: User | null) => void;
  setSession: (session: SessionData | null) => void;
  login: (user: User, session: SessionData) => void;
  logout: () => void;
  clearError: () => void;
  updateLastActivity: () => void;
  
  // Session management
  isSessionValid: () => boolean;
  getTimeUntilExpiry: () => number;
  shouldRefreshToken: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      isLoading: false,
      user: null,
      session: null,
      error: null,

      // Actions
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: AuthError | null) => {
        set({ error });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setSession: (session: SessionData | null) => {
        set({ session });
      },

      login: (user: User, session: SessionData) => {
        set({
          isAuthenticated: true,
          user,
          session,
          error: null,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          session: null,
          error: null,
          isLoading: false,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      updateLastActivity: () => {
        const { session } = get();
        if (session) {
          set({
            session: {
              ...session,
              lastActivity: new Date(),
            },
          });
        }
      },

      // Session validation
      isSessionValid: () => {
        const { session } = get();
        if (!session) return false;
        
        const now = new Date();
        const expiresAt = new Date(session.expiresAt);
        return now < expiresAt;
      },

      getTimeUntilExpiry: () => {
        const { session } = get();
        if (!session) return 0;
        
        const now = new Date();
        const expiresAt = new Date(session.expiresAt);
        return Math.max(0, expiresAt.getTime() - now.getTime());
      },

      shouldRefreshToken: () => {
        const timeUntilExpiry = get().getTimeUntilExpiry();
        // Refresh if token expires in less than 5 minutes (300000 ms)
        return timeUntilExpiry > 0 && timeUntilExpiry < 300000;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        session: state.session,
      }),
      // Rehydrate the store and validate session on load
      onRehydrateStorage: () => (state) => {
        if (state && state.session) {
          const isValid = state.isSessionValid();
          if (!isValid) {
            state.logout();
          }
        }
      },
    }
  )
);

// Selectors for common use cases
export const useAuth = () => {
  const store = useAuthStore();
  return {
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    user: store.user,
    error: store.error,
  };
};

export const useAuthActions = () => {
  const store = useAuthStore();
  return {
    login: store.login,
    logout: store.logout,
    setLoading: store.setLoading,
    setError: store.setError,
    clearError: store.clearError,
  };
};

export const useSession = () => {
  const store = useAuthStore();
  return {
    session: store.session,
    isSessionValid: store.isSessionValid,
    getTimeUntilExpiry: store.getTimeUntilExpiry,
    shouldRefreshToken: store.shouldRefreshToken,
    updateLastActivity: store.updateLastActivity,
  };
};