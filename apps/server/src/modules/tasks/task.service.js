import { BaseService } from '../../core/database/base.service.js';
import { ActivityRepository } from '../activities/activity.repository.js';
import { ActivityService } from '../activities/activity.service.js';

/**
 * TaskService class.
 * Orchestrates business rules, scopes tasks by userId, handles goal associations,
 * and maintains task state transformations (such as completedAt tracking).
 */
export class TaskService extends BaseService {
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
   * Retrieves all tasks belonging to a specific user.
   * @param {string} userId 
   * @param {string} [status] 
   */
  async getTasksByUser(userId, status) {
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
   * Retrieves a single task by ID, ensuring it belongs to the user.
   * @param {string} id 
   * @param {string} userId 
   */
  async getTaskByIdAndUser(id, userId) {
    await this.ensureUserExists(userId);
    const task = await this.repository.findUnique({
      where: { id, userId },
      include: {
        goal: true,
      },
    });
    if (!task) {
      const error = new Error(`Task with ID "${id}" was not found for this user.`);
      error.status = 404;
      throw error;
    }
    return task;
  }

  /**
   * Retrieves tasks associated with a goal, ensuring the goal belongs to the user.
   * @param {string} goalId 
   * @param {string} userId 
   */
  async getTasksByGoal(goalId, userId) {
    await this.ensureUserExists(userId);
    
    // Validate that the goal exists and belongs to the user
    const goal = await this.repository.db.goal.findUnique({
      where: { id: goalId, userId },
    });
    if (!goal) {
      const error = new Error(`Goal with ID "${goalId}" was not found for this user.`);
      error.status = 404;
      throw error;
    }

    return this.repository.findMany({
      where: { goalId, userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Creates a new task scoped to the user, optionally associated with a goal.
   * @param {string} userId 
   * @param {string} role 
   * @param {object} data 
   */
  async createTask(userId, role, data) {
    await this.ensureUserExists(userId, role);

    if (data.goalId) {
      // Validate that the goal exists and belongs to this user
      const goal = await this.repository.db.goal.findUnique({
        where: { id: data.goalId, userId },
      });
      if (!goal) {
        const error = new Error(`Goal with ID "${data.goalId}" was not found for this user.`);
        error.status = 400;
        throw error;
      }
    }

    const taskData = {
      title: data.title,
      description: data.description || null,
      status: data.status || 'pending',
      priority: data.priority || 'medium',
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      userId,
      goalId: data.goalId || null,
    };

    if (taskData.status === 'completed') {
      taskData.completedAt = new Date();
    }

    const task = await this.repository.create({
      data: taskData,
    });

    await this.activityService.logActivity(userId, 'TASK_CREATED', 'task', task.id, {
      taskTitle: task.title,
      priority: task.priority,
    });

    return task;
  }

  /**
   * Updates an existing task scoped to the user.
   * @param {string} id 
   * @param {string} userId 
   * @param {object} data 
   */
  async updateTask(id, userId, data) {
    const task = await this.getTaskByIdAndUser(id, userId);

    if (data.goalId) {
      // Validate that the goal exists and belongs to this user
      const goal = await this.repository.db.goal.findUnique({
        where: { id: data.goalId, userId },
      });
      if (!goal) {
        const error = new Error(`Goal with ID "${data.goalId}" was not found for this user.`);
        error.status = 400;
        throw error;
      }
    }

    const updatePayload = {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate !== undefined ? (data.dueDate ? new Date(data.dueDate) : null) : undefined,
      goalId: data.goalId !== undefined ? data.goalId : undefined,
    };

    if (data.status !== undefined) {
      if (data.status === 'completed') {
        updatePayload.completedAt = task.completedAt || new Date();
      } else {
        updatePayload.completedAt = null;
      }
    }

    // Clean undefined fields
    Object.keys(updatePayload).forEach(
      (key) => updatePayload[key] === undefined && delete updatePayload[key]
    );

    const result = await this.repository.update(id, updatePayload);

    await this.activityService.logActivity(userId, 'TASK_UPDATED', 'task', result.id, {
      taskTitle: result.title,
      priority: result.priority,
    });

    return result;
  }

  /**
   * Deletes a task scoped to the user.
   * @param {string} id 
   * @param {string} userId 
   */
  async deleteTask(id, userId) {
    const task = await this.getTaskByIdAndUser(id, userId);
    const result = await this.repository.delete(id);

    await this.activityService.logActivity(userId, 'TASK_DELETED', 'task', id, {
      taskTitle: task.title,
    });

    return result;
  }

  /**
   * Completes a task by setting its status and completedAt fields.
   * @param {string} id 
   * @param {string} userId 
   */
  async completeTask(id, userId) {
    const task = await this.getTaskByIdAndUser(id, userId);
    const result = await this.repository.update(id, {
      status: 'completed',
      completedAt: new Date(),
    });

    await this.activityService.logActivity(userId, 'TASK_COMPLETED', 'task', id, {
      taskTitle: task.title,
    });

    return result;
  }

  /**
   * Updates the status of a task and adjusts the completedAt field dynamically.
   * @param {string} id 
   * @param {string} userId 
   * @param {string} status 
   */
  async updateTaskStatus(id, userId, status) {
    const task = await this.getTaskByIdAndUser(id, userId);
    
    const updateData = { status };
    if (status === 'completed') {
      updateData.completedAt = new Date();
    } else {
      updateData.completedAt = null;
    }

    const result = await this.repository.update(id, updateData);

    const action = status === 'completed' ? 'TASK_COMPLETED' : 'TASK_UPDATED';

    await this.activityService.logActivity(userId, action, 'task', id, {
      taskTitle: result.title,
      status: result.status,
    });

    return result;
  }
}
