import { create } from 'zustand';
import { axiosClient } from '../../services/api/axios-client.js';

/**
 * Zustand Analytics Store.
 * Manages aggregated dashboard stats, specific model stats, loading/error flags.
 */
export const useAnalyticsStore = create((set) => ({
  dashboardStats: null,
  goalStats: null,
  taskStats: null,
  activityStats: null,
  loading: false,
  error: null,

  /**
   * Fetch complete dashboard aggregate statistics from backend
   */
  fetchDashboardStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get('/api/analytics/dashboard');
      set({ dashboardStats: response?.data || null, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch dashboard statistics', loading: false });
    }
  },

  /**
   * Fetch goal-specific statistics
   */
  fetchGoalStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get('/api/analytics/goals');
      set({ goalStats: response?.data || null, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch goal statistics', loading: false });
    }
  },

  /**
   * Fetch task-specific statistics
   */
  fetchTaskStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get('/api/analytics/tasks');
      set({ taskStats: response?.data || null, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch task statistics', loading: false });
    }
  },

  /**
   * Fetch activity-specific statistics
   */
  fetchActivityStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get('/api/analytics/activities');
      set({ activityStats: response?.data || null, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch activity statistics', loading: false });
    }
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));
