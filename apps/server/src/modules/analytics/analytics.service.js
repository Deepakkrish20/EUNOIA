import { prisma } from '../../core/database/index.js';

/**
 * AnalyticsService class.
 * Computes metrics and indicators for goals, tasks, and audit logs.
 */
export class AnalyticsService {
  constructor() {
    this.prisma = prisma;
  }

  /**
   * Fetches goal-specific metrics.
   * @param {string} userId 
   */
  async getGoalStats(userId) {
    const [total, active, completed, archived] = await Promise.all([
      this.prisma.goal.count({ where: { userId } }),
      this.prisma.goal.count({ where: { userId, status: 'active' } }),
      this.prisma.goal.count({ where: { userId, status: 'completed' } }),
      this.prisma.goal.count({ where: { userId, status: 'archived' } }),
    ]);

    const completionRate = total > 0 
      ? parseFloat(((completed / total) * 100).toFixed(2)) 
      : 0;

    return {
      totalGoals: total,
      activeGoals: active,
      completedGoals: completed,
      archivedGoals: archived,
      goalCompletionRate: completionRate,
    };
  }

  /**
   * Fetches task-specific metrics.
   * @param {string} userId 
   */
  async getTaskStats(userId) {
    const [total, pending, inProgress, completed] = await Promise.all([
      this.prisma.task.count({ where: { userId } }),
      this.prisma.task.count({ where: { userId, status: 'pending' } }),
      this.prisma.task.count({ where: { userId, status: 'in_progress' } }),
      this.prisma.task.count({ where: { userId, status: 'completed' } }),
    ]);

    const completionRate = total > 0 
      ? parseFloat(((completed / total) * 100).toFixed(2)) 
      : 0;

    return {
      totalTasks: total,
      pendingTasks: pending,
      inProgressTasks: inProgress,
      completedTasks: completed,
      taskCompletionRate: completionRate,
    };
  }

  /**
   * Fetches activity-specific metrics.
   * @param {string} userId 
   */
  async getActivityStats(userId) {
    const now = new Date();
    
    // Start of Today
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Start of This Week (Sunday)
    const day = now.getDay();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
    
    // Start of This Month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, recentCount, todayCount, weekCount, monthCount] = await Promise.all([
      this.prisma.activity.count({ where: { userId } }),
      this.prisma.activity.count({
        where: {
          userId,
          createdAt: { gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) } // Last 3 days
        }
      }),
      this.prisma.activity.count({
        where: {
          userId,
          createdAt: { gte: startOfToday }
        }
      }),
      this.prisma.activity.count({
        where: {
          userId,
          createdAt: { gte: startOfWeek }
        }
      }),
      this.prisma.activity.count({
        where: {
          userId,
          createdAt: { gte: startOfMonth }
        }
      }),
    ]);

    return {
      totalActivities: total,
      recentActivitiesCount: recentCount,
      activitiesToday: todayCount,
      activitiesThisWeek: weekCount,
      activitiesThisMonth: monthCount,
    };
  }

  /**
   * Fetches the complete aggregated dashboard telemetry.
   * @param {string} userId 
   */
  async getDashboardStats(userId) {
    const [goals, tasks, activities] = await Promise.all([
      this.getGoalStats(userId),
      this.getTaskStats(userId),
      this.getActivityStats(userId),
    ]);

    return {
      ...goals,
      ...tasks,
      ...activities,
    };
  }
}
