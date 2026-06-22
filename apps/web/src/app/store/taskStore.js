import { create } from 'zustand';

/**
 * Zustand Task Store.
 * Manages operational lists and Kanban board operations.
 */
export const useTaskStore = create((set) => ({
  tasks: [],
  filterStatus: 'ALL', // ALL, TODO, IN_PROGRESS, COMPLETED

  setTasks: (tasks) => set({ tasks }),
  setFilterStatus: (filterStatus) => set({ filterStatus }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, status } : t)
  })),
}));
