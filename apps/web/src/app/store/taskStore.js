import { create } from 'zustand';
import { axiosClient } from '../../services/api/axios-client.js';

/**
 * Helper to compute task statistics dynamically.
 * Reusable by future dashboard modules or component selectors.
 * @param {Array} tasks 
 */
export const getTaskStats = (tasks = []) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return {
    totalTasks: total,
    completedTasks: completed,
    pendingTasks: pending,
    inProgressTasks: inProgress,
    completionPercentage,
  };
};

/**
 * Zustand Task Store.
 * Manages operational task lists, loading states, error states, and statistics.
 */
export const useTaskStore = create((set, get) => ({
  tasks: [],
  completedTasks: [],
  pendingTasks: [],
  loading: false,
  error: null,

  /**
   * Helper to sync tasks lists and automatically filter categories/statuses
   */
  syncTasks: (tasks) => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    set({
      tasks: sortedTasks,
      completedTasks: sortedTasks.filter((t) => t.status === 'completed'),
      pendingTasks: sortedTasks.filter((t) => t.status === 'pending'),
    });
  },

  /**
   * Fetch all tasks belonging to the authenticated user
   */
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get('/api/tasks');
      const tasksList = response?.data || [];
      get().syncTasks(tasksList);
      set({ loading: false });
      return tasksList;
    } catch (err) {
      set({ error: err.message || 'Failed to fetch tasks', loading: false });
      throw err;
    }
  },

  /**
   * Fetch a single task by its ID
   */
  fetchTaskById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/api/tasks/${id}`);
      const task = response?.data || null;
      set({ loading: false });
      return task;
    } catch (err) {
      set({ error: err.message || 'Failed to fetch task details', loading: false });
      throw err;
    }
  },

  /**
   * Fetch tasks associated with a specific goal ID
   */
  fetchTasksByGoal: async (goalId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.get(`/api/goals/${goalId}/tasks`);
      const tasksList = response?.data || [];
      set({ loading: false });
      return tasksList;
    } catch (err) {
      set({ error: err.message || 'Failed to fetch tasks for goal', loading: false });
      throw err;
    }
  },

  /**
   * Create a new task
   */
  createTask: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.post('/api/tasks', payload);
      const newTask = response?.data;
      if (newTask) {
        const updated = [newTask, ...get().tasks];
        get().syncTasks(updated);
      }
      set({ loading: false });
      return newTask;
    } catch (err) {
      set({ error: err.message || 'Failed to create task', loading: false });
      throw err;
    }
  },

  /**
   * Update an existing task
   */
  updateTask: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.put(`/api/tasks/${id}`, payload);
      const updatedTask = response?.data;
      if (updatedTask) {
        const updated = get().tasks.map((t) => (t.id === id ? updatedTask : t));
        get().syncTasks(updated);
      }
      set({ loading: false });
      return updatedTask;
    } catch (err) {
      set({ error: err.message || 'Failed to update task', loading: false });
      throw err;
    }
  },

  /**
   * Delete an existing task
   */
  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosClient.delete(`/api/tasks/${id}`);
      const updated = get().tasks.filter((t) => t.id !== id);
      get().syncTasks(updated);
      set({ loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to delete task', loading: false });
      throw err;
    }
  },

  /**
   * Mark a task as completed
   */
  completeTask: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.patch(`/api/tasks/${id}/complete`);
      const updatedTask = response?.data;
      if (updatedTask) {
        const updated = get().tasks.map((t) => (t.id === id ? updatedTask : t));
        get().syncTasks(updated);
      }
      set({ loading: false });
      return updatedTask;
    } catch (err) {
      set({ error: err.message || 'Failed to complete task', loading: false });
      throw err;
    }
  },

  /**
   * Change status of a task
   */
  updateTaskStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosClient.patch(`/api/tasks/${id}/status`, { status });
      const updatedTask = response?.data;
      if (updatedTask) {
        const updated = get().tasks.map((t) => (t.id === id ? updatedTask : t));
        get().syncTasks(updated);
      }
      set({ loading: false });
      return updatedTask;
    } catch (err) {
      set({ error: err.message || 'Failed to update task status', loading: false });
      throw err;
    }
  },

  /**
   * Alias for change status of a task
   */
  changeTaskStatus: async (id, status) => {
    return get().updateTaskStatus(id, status);
  },

  /**
   * Expose statistics helper directly in the store
   */
  getStats: () => {
    return getTaskStats(get().tasks);
  },

  /**
   * Clear error state
   */
  clearError: () => set({ error: null }),
}));
