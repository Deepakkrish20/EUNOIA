/**
 * Map API endpoint paths for the backend service routers.
 */
export const API_ENDPOINTS = {
  AUTH: {
    SESSION: '/api/auth/session',
  },
  USERS: {
    PROFILE: '/api/users/profile',
  },
  DASHBOARD: {
    METRICS: '/api/dashboard/metrics',
  },
  TWIN: {
    STATE: '/api/twin/state',
  },
  VISION: {
    OBJECTIVES: '/api/vision/objectives',
  },
  LEGACY: {
    DATA: '/api/legacy/data',
  },
  GOALS: {
    LIST: '/api/goals/list',
    CREATE: '/api/goals',
  },
  TASKS: {
    LIST: '/api/tasks/list',
    CREATE: '/api/tasks',
  },
  LEARNING: {
    COURSES: '/api/learning/courses',
  },
  ASSISTANT: {
    CHAT: '/api/assistant/chat',
  },
  ANALYTICS: {
    REPORTS: '/api/analytics/reports',
  },
};
