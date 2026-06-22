import { create } from 'zustand';

/**
 * Zustand Auth Store.
 * Manages frontend session status and tokens.
 */
export const useAuthStore = create((set) => ({
  user: null,
  sessionToken: null,
  isAuthenticated: false,
  isLoading: false,

  setSession: (user, token) => set({ 
    user, 
    sessionToken: token, 
    isAuthenticated: !!user 
  }),
  
  clearSession: () => set({ 
    user: null, 
    sessionToken: null, 
    isAuthenticated: false 
  }),

  setLoading: (isLoading) => set({ isLoading }),
}));
