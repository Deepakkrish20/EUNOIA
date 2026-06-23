import { BaseController } from '../../core/errors/base.controller.js';

/**
 * AnalyticsController class.
 * Map HTTP requests to AnalyticsService aggregation methods.
 */
export class AnalyticsController extends BaseController {
  /**
   * @param {import('./analytics.service').AnalyticsService} analyticsService 
   */
  constructor(analyticsService) {
    super();
    this.analyticsService = analyticsService;
  }

  getDashboardStats = this.catchAsync(async (req, res) => {
    const { userId } = req.auth;
    const stats = await this.analyticsService.getDashboardStats(userId);
    return this.sendResponse(res, stats);
  });

  getGoalStats = this.catchAsync(async (req, res) => {
    const { userId } = req.auth;
    const stats = await this.analyticsService.getGoalStats(userId);
    return this.sendResponse(res, stats);
  });

  getTaskStats = this.catchAsync(async (req, res) => {
    const { userId } = req.auth;
    const stats = await this.analyticsService.getTaskStats(userId);
    return this.sendResponse(res, stats);
  });

  getActivityStats = this.catchAsync(async (req, res) => {
    const { userId } = req.auth;
    const stats = await this.analyticsService.getActivityStats(userId);
    return this.sendResponse(res, stats);
  });
}
