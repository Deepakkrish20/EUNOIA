import { BaseController } from '../../core/errors/base.controller.js';

/**
 * GoalController class.
 * Exposes REST API endpoints, maps path context parameters, and handles JSON serialization.
 */
export class GoalController extends BaseController {
  /**
   * @param {import('./goal.service').GoalService} goalService 
   */
  constructor(goalService) {
    super();
    this.goalService = goalService;
  }

  getGoals = this.catchAsync(async (req, res) => {
    const { userId } = req.auth;
    const { status } = req.query;
    const goals = await this.goalService.getGoalsByUser(userId, status);
    return this.sendResponse(res, goals);
  });

  getGoalById = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const goal = await this.goalService.getGoalByIdAndUser(id, userId);
    return this.sendResponse(res, goal);
  });

  createGoal = this.catchAsync(async (req, res) => {
    const { userId, role } = req.auth;
    const goal = await this.goalService.createGoal(userId, role, req.body);
    return this.sendResponse(res, goal, 201);
  });

  updateGoal = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const goal = await this.goalService.updateGoal(id, userId, req.body);
    return this.sendResponse(res, goal);
  });

  deleteGoal = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    await this.goalService.deleteGoal(id, userId);
    return this.sendResponse(res, { message: 'Goal deleted successfully' });
  });

  completeGoal = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const goal = await this.goalService.completeGoal(id, userId);
    return this.sendResponse(res, goal);
  });

  archiveGoal = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const goal = await this.goalService.archiveGoal(id, userId);
    return this.sendResponse(res, goal);
  });
}
