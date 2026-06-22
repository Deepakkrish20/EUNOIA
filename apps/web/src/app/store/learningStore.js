import { create } from 'zustand';

/**
 * Zustand Learning Store.
 * Manages active adaptive modules, recommended courses, and overall topic completion.
 */
export const useLearningStore = create((set) => ({
  courses: [],
  progressMetrics: [],
  activeCourseId: null,

  setCourses: (courses) => set({ courses }),
  setProgressMetrics: (progressMetrics) => set({ progressMetrics }),
  setActiveCourse: (activeCourseId) => set({ activeCourseId }),
  updateProgress: (topicId, percent) => set((state) => ({
    progressMetrics: state.progressMetrics.map((p) => 
      p.topic === topicId ? { ...p, percent, completed: percent >= 100 } : p
    )
  })),
}));
