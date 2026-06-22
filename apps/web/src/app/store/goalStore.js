import { create } from 'zustand';

/**
 * Zustand Goal Store.
 * Manages active objectives and long-term targets.
 */
export const useGoalStore = create((set) => ({
  goals: [],
  selectedGoal: null,

  setGoals: (goals) => set({ goals }),
  setSelectedGoal: (selectedGoal) => set({ selectedGoal }),
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  removeGoal: (id) => set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
}));
