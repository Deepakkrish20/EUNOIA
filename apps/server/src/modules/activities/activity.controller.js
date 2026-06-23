import { BaseController } from '../../core/errors/base.controller.js';

/**
 * ActivityController class.
 * Exposes REST API endpoints, handles parameter extraction, and serializes JSON envelopes.
 */
export class ActivityController extends BaseController {
  /**
   * @param {import('./activity.service').ActivityService} activityService 
   */
  constructor(activityService) {
    super();
    this.activityService = activityService;
  }

  getActivities = this.catchAsync(async (req, res) => {
    const { userId } = req.auth;
    const { page = 1, limit = 10 } = req.query;
    const result = await this.activityService.getActivitiesByUser(userId, page, limit);
    return this.sendResponse(res, result);
  });

  getRecentActivities = this.catchAsync(async (req, res) => {
    const { userId } = req.auth;
    const { limit = 5 } = req.query;
    const result = await this.activityService.getRecentActivitiesByUser(userId, limit);
    return this.sendResponse(res, result);
  });

  getActivityById = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const result = await this.activityService.getActivityByIdAndUser(id, userId);
    return this.sendResponse(res, result);
  });
}
