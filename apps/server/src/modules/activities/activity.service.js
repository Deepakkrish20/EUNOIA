import { BaseService } from '../../core/database/base.service.js';

/**
 * ActivityService class.
 * Manages database writes for activities, user profiles checking, paginated lists, and recent feeds.
 */
export class ActivityService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  /**
   * Ensure user record exists in EUNOIA OS database to satisfy foreign keys.
   * @param {string} userId - Auth user ID
   */
  async ensureUserExists(userId) {
    const user = await this.repository.db.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      await this.repository.db.user.create({
        data: {
          id: userId,
          email: `${userId}@eunoia.os`,
          name: userId === 'user_clerk_admin_123' ? 'Admin User' : 'Standard User',
          role: 'USER',
        },
      });
    }
  }

  /**
   * Log a new activity in the database.
   * @param {string} userId 
   * @param {string} action 
   * @param {string} entityType 
   * @param {string} entityId 
   * @param {object} metadata 
   */
  async logActivity(userId, action, entityType, entityId, metadata) {
    try {
      await this.ensureUserExists(userId);
      return await this.repository.create({
        data: {
          action,
          entityType,
          entityId,
          metadata: metadata || {},
          userId,
        },
      });
    } catch (err) {
      // Gracefully catch logging failures to avoid breaking primary workflows (like Goal creation)
      console.error(`[Activity Logging Failed]: ${err.message}`);
    }
  }

  /**
   * Retrieve a paginated list of user activities.
   * @param {string} userId 
   * @param {number} page 
   * @param {number} limit 
   */
  async getActivitiesByUser(userId, page = 1, limit = 10) {
    await this.ensureUserExists(userId);

    const parsedPage = Math.max(1, parseInt(page, 10));
    const parsedLimit = Math.max(1, parseInt(limit, 10));
    const skip = (parsedPage - 1) * parsedLimit;

    const [activities, total] = await Promise.all([
      this.repository.findMany({
        where: { userId },
        skip,
        take: parsedLimit,
        orderBy: { createdAt: 'desc' },
      }),
      this.repository.count({
        where: { userId },
      }),
    ]);

    const totalPages = Math.ceil(total / parsedLimit);

    return {
      activities,
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
    };
  }

  /**
   * Retrieve a fixed list of recent activities.
   * @param {string} userId 
   * @param {number} limit 
   */
  async getRecentActivitiesByUser(userId, limit = 5) {
    await this.ensureUserExists(userId);

    const parsedLimit = Math.max(1, parseInt(limit, 10));

    return this.repository.findMany({
      where: { userId },
      take: parsedLimit,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Retrieve an activity by ID, scoping checks to the authenticated user.
   * @param {string} id 
   * @param {string} userId 
   */
  async getActivityByIdAndUser(id, userId) {
    await this.ensureUserExists(userId);

    const activity = await this.repository.findUnique({
      where: { id, userId },
    });

    if (!activity) {
      const error = new Error(`Activity with ID "${id}" was not found for this user.`);
      error.status = 404;
      throw error;
    }

    return activity;
  }
}
