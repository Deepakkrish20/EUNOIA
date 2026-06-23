import { create } from 'zustand';
import { axiosClient } from '../../services/api/axios-client.js';

/**
 * Zustand Goal Store.
 * Manages goals state, filtered list sub-states, loading indicators, and error tracking.
 */
export const useGoalStore = create((set, get) => ({
  goals: [],
  activeGoals: [],
  completedGoals: [],
  archivedGoals: [],
  selectedGoal: null,
  loading: false,
  error: null,

  /**
   * Helper to sync goals list and automatically filter categories
   */
  syncGoals: (goals) => {
    const sortedGoals = [...goals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    set({
      goals: sortedGoals,
      activeGoals: sortedGoals.filter((g) => g.status === 'active'),
      completedGoals: sortedGoals.filter((g) => g.status === 'completed'),
      archivedGoals: sortedGoals.filter((g) => g.status === 'archived'),
    });
  },

  /**
   * Fetch all goals belonging to user from server
   */
  fetchGoals: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get('/api/goals');
      // Axios interceptor extracts response.data, which is { data: [...], status: 200 }
      const goalsList = response?.data || [];
      get().syncGoals(goalsList);
      set({ loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch goals', loading: false });
    }
  },

  /**
   * Fetch a single goal by its ID
   */
  fetchGoalById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/api/goals/${id}`);
      const goal = response?.data || null;
      set({ selectedGoal: goal, loading: false });
      return goal;
    } catch (err) {
      set({ error: err.message || 'Failed to fetch goal detail', loading: false });
      throw err;
    }
  },

  /**
   * Create a new goal
   */
  createGoal: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post('/api/goals', payload);
      const newGoal = response?.data;
      if (newGoal) {
        const updated = [newGoal, ...get().goals];
        get().syncGoals(updated);
      }
      set({ loading: false });
      return newGoal;
    } catch (err) {
      set({ error: err.message || 'Failed to create goal', loading: false });
      throw err;
    }
  },

  /**
   * Update an existing goal
   */
  updateGoal: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.put(`/api/goals/${id}`, payload);
      const updatedGoal = response?.data;
      if (updatedGoal) {
        const updated = get().goals.map((g) => (g.id === id ? updatedGoal : g));
        get().syncGoals(updated);
      }
      set({ loading: false });
      return updatedGoal;
    } catch (err) {
      set({ error: err.message || 'Failed to update goal', loading: false });
      throw err;
    }
  },

  /**
   * Delete a goal
   */
  deleteGoal: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosClient.delete(`/api/goals/${id}`);
      const updated = get().goals.filter((g) => g.id !== id);
      get().syncGoals(updated);
      set({ loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to delete goal', loading: false });
      throw err;
    }
  },

  /**
   * Mark a goal as completed
   */
  completeGoal: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.patch(`/api/goals/${id}/complete`);
      const updatedGoal = response?.data;
      if (updatedGoal) {
        const updated = get().goals.map((g) => (g.id === id ? updatedGoal : g));
        get().syncGoals(updated);
      }
      set({ loading: false });
      return updatedGoal;
    } catch (err) {
      set({ error: err.message || 'Failed to mark goal complete', loading: false });
      throw err;
    }
  },

  /**
   * Mark a goal as archived
   */
  archiveGoal: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.patch(`/api/goals/${id}/archive`);
      const updatedGoal = response?.data;
      if (updatedGoal) {
        const updated = get().goals.map((g) => (g.id === id ? updatedGoal : g));
        get().syncGoals(updated);
      }
      set({ loading: false });
      return updatedGoal;
    } catch (err) {
      set({ error: err.message || 'Failed to archive goal', loading: false });
      throw err;
    }
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));
