import { create } from 'zustand';

/**
 * Zustand User Store.
 * Manages user profile details and settings.
 */
export const useUserStore = create((set) => ({
  profile: null,
  preferences: {
    notifications: true,
    theme: 'dark',
  },

  setProfile: (profile) => set({ profile }),
  updatePreferences: (prefs) => set((state) => ({
    preferences: { ...state.preferences, ...prefs }
  })),
  clearUser: () => set({ profile: null }),
}));
