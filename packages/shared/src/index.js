// Global constants shared across frontend (React) and backend (Express)
export const SYSTEM_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST',
};

export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
};

export const GOAL_TYPES = {
  SHORT_TERM: 'SHORT_TERM',
  LONG_TERM: 'LONG_TERM',
  MILESTONE: 'MILESTONE',
};

// Base API routes paths
export const API_ROUTES = {
  AUTH: '/api/v1/auth',
  USERS: '/api/v1/users',
  DASHBOARD: '/api/v1/dashboard',
  TWIN: '/api/v1/twin',
  VISION: '/api/v1/vision',
  GOALS: '/api/v1/goals',
  TASKS: '/api/v1/tasks',
  LEARNING: '/api/v1/learning',
  ASSISTANT: '/api/v1/assistant',
  ANALYTICS: '/api/v1/analytics',
};
