import { create } from 'zustand';

/**
 * Global Zustand state store for UI and local application state.
 */
export const useAppStore = create((set) => ({
  theme: 'blueprint',
  sidebarOpen: true,
  
  /**
   * Updates system theme mode (light/dark)
   * @param {'light'|'dark'} theme 
   */
  setTheme: (theme) => set({ theme }),

  /**
   * Toggles the sidebar visibility state
   */
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
