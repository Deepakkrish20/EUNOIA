import { create } from 'zustand';
import { axiosClient } from '../../services/api/axios-client.js';

/**
 * Zustand Activity Store.
 * Manages paginated audit trails, recent telemetry feeds, pagination details, and error states.
 */
export const useActivityStore = create((set, get) => ({
  activities: [],
  recentActivities: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  /**
   * Fetch paginated list of user activities from backend
   */
  fetchActivities: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get('/api/activities', {
        params: { page, limit },
      });
      const dataPayload = response?.data || {};
      set({
        activities: dataPayload.activities || [],
        pagination: {
          page: dataPayload.page || page,
          limit: dataPayload.limit || limit,
          total: dataPayload.total || 0,
          totalPages: dataPayload.totalPages || 0,
        },
        loading: false,
      });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch activities', loading: false });
    }
  },

  /**
   * Fetch recent activities list for dashboard logging
   */
  fetchRecentActivities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get('/api/activities/recent');
      const recentList = response?.data || [];
      set({ recentActivities: recentList, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch recent activities', loading: false });
    }
  },

  /**
   * Fetch details of a single activity log entry
   */
  fetchActivityById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/api/activities/${id}`);
      set({ loading: false });
      return response?.data || null;
    } catch (err) {
      set({ error: err.message || 'Failed to fetch activity details', loading: false });
      throw err;
    }
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));
