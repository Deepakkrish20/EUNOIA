import { create } from 'zustand';

/**
 * Zustand Dashboard Store.
 * Holds active system metrics and analytics displays.
 */
export const useDashboardStore = create((set) => ({
  metrics: null,
  activeWidget: 'main',
  isRefreshing: false,

  setMetrics: (metrics) => set({ metrics }),
  setActiveWidget: (activeWidget) => set({ activeWidget }),
  setRefreshing: (isRefreshing) => set({ isRefreshing }),
}));
