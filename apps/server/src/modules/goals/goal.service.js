import { BaseService } from '../../core/database/base.service.js';
import { ActivityRepository } from '../activities/activity.repository.js';
import { ActivityService } from '../activities/activity.service.js';

/**
 * GoalService class.
 * Orchestrates business rules, scopes goals by userId, and guarantees User presence.
 */
export class GoalService extends BaseService {
  constructor(repository) {
    super(repository);
    const activityRepository = new ActivityRepository();
    this.activityService = new ActivityService(activityRepository);
  }

  /**
   * Ensure user record exists in EUNOIA OS database to satisfy foreign keys.
   * @param {string} userId - Auth user ID
   * @param {string} [role] - User role
   */
  async ensureUserExists(userId, role) {
    const user = await this.repository.db.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      await this.repository.db.user.create({
        data: {
          id: userId,
          email: `${userId}@eunoia.os`,
          name: userId === 'user_clerk_admin_123' ? 'Admin User' : 'Standard User',
          role: role || 'USER',
        },
      });
    }
  }

  /**
   * Retrieves all goals belonging to a specific user.
   * @param {string} userId 
   * @param {string} [status] 
   */
  async getGoalsByUser(userId, status) {
    await this.ensureUserExists(userId);
    const query = {
      where: { userId },
      orderBy: { createdAt: 'desc' },
    };
    if (status) {
      query.where.status = status;
    }
    return this.repository.findMany(query);
  }

  /**
   * Retrieves a single goal by ID, ensuring it belongs to the user.
   * @param {string} id 
   * @param {string} userId 
   */
  async getGoalByIdAndUser(id, userId) {
    await this.ensureUserExists(userId);
    const goal = await this.repository.findUnique({
      where: { id, userId },
    });
    if (!goal) {
      const error = new Error(`Goal with ID "${id}" was not found for this user.`);
      error.status = 404;
      throw error;
    }
    return goal;
  }

  /**
   * Creates a new goal scoped to the user.
   * @param {string} userId 
   * @param {string} role 
   * @param {object} data 
   */
  async createGoal(userId, role, data) {
    await this.ensureUserExists(userId, role);
    const goal = await this.repository.create({
      data: {
        title: data.title,
        description: data.description || null,
        category: data.category,
        priority: data.priority,
        status: data.status || 'active',
        targetDate: new Date(data.targetDate),
        userId,
      },
    });

    await this.activityService.logActivity(userId, 'GOAL_CREATED', 'goal', goal.id, {
      goalTitle: goal.title,
      priority: goal.priority
    });

    return goal;
  }

  /**
   * Updates an existing goal scoped to the user.
   * @param {string} id 
   * @param {string} userId 
   * @param {object} data 
   */
  async updateGoal(id, userId, data) {
    // Verify ownership and existence
    await this.getGoalByIdAndUser(id, userId);

    const updatePayload = {
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      status: data.status,
      targetDate: data.targetDate ? new Date(data.targetDate) : undefined,
    };

    // Clean undefined fields
    Object.keys(updatePayload).forEach(
      (key) => updatePayload[key] === undefined && delete updatePayload[key]
    );

    const goal = await this.repository.update(id, updatePayload);

    await this.activityService.logActivity(userId, 'GOAL_UPDATED', 'goal', goal.id, {
      goalTitle: goal.title,
      priority: goal.priority
    });

    return goal;
  }

  /**
   * Deletes a goal scoped to the user.
   * @param {string} id 
   * @param {string} userId 
   */
  async deleteGoal(id, userId) {
    // Verify ownership and existence
    const goal = await this.getGoalByIdAndUser(id, userId);
    const result = await this.repository.delete(id);

    await this.activityService.logActivity(userId, 'GOAL_DELETED', 'goal', id, {
      goalTitle: goal.title
    });

    return result;
  }

  /**
   * Completes a goal by updating its status and completedAt fields.
   * @param {string} id 
   * @param {string} userId 
   */
  async completeGoal(id, userId) {
    const goal = await this.getGoalByIdAndUser(id, userId);
    const result = await this.repository.update(id, {
      status: 'completed',
      completedAt: new Date(),
    });

    await this.activityService.logActivity(userId, 'GOAL_COMPLETED', 'goal', id, {
      goalTitle: goal.title
    });

    return result;
  }

  /**
   * Archives a goal by updating its status field.
   * @param {string} id 
   * @param {string} userId 
   */
  async archiveGoal(id, userId) {
    const goal = await this.getGoalByIdAndUser(id, userId);
    const result = await this.repository.update(id, {
      status: 'archived',
    });

    await this.activityService.logActivity(userId, 'GOAL_ARCHIVED', 'goal', id, {
      goalTitle: goal.title
    });

    return result;
  }
}
