import { BaseController } from '../../core/errors/base.controller.js';

/**
 * TaskController class.
 * Handles Express requests, maps path/query parameters, and coordinates operations with TaskService.
 */
export class TaskController extends BaseController {
  /**
   * @param {import('./task.service').TaskService} taskService 
   */
  constructor(taskService) {
    super();
    this.taskService = taskService;
  }

  getTasks = this.catchAsync(async (req, res) => {
    const { userId } = req.auth;
    const { status } = req.query;
    const tasks = await this.taskService.getTasksByUser(userId, status);
    return this.sendResponse(res, tasks);
  });

  getTaskById = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const task = await this.taskService.getTaskByIdAndUser(id, userId);
    return this.sendResponse(res, task);
  });

  getTasksByGoal = this.catchAsync(async (req, res) => {
    const { goalId } = req.params;
    const { userId } = req.auth;
    const tasks = await this.taskService.getTasksByGoal(goalId, userId);
    return this.sendResponse(res, tasks);
  });

  createTask = this.catchAsync(async (req, res) => {
    const { userId, role } = req.auth;
    const task = await this.taskService.createTask(userId, role, req.body);
    return this.sendResponse(res, task, 201);
  });

  updateTask = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const task = await this.taskService.updateTask(id, userId, req.body);
    return this.sendResponse(res, task);
  });

  deleteTask = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    await this.taskService.deleteTask(id, userId);
    return this.sendResponse(res, { message: 'Task deleted successfully' });
  });

  completeTask = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const task = await this.taskService.completeTask(id, userId);
    return this.sendResponse(res, task);
  });

  updateTaskStatus = this.catchAsync(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;
    const { status } = req.body;

    if (!status) {
      const error = new Error('Status field is required');
      error.status = 400;
      throw error;
    }

    const task = await this.taskService.updateTaskStatus(id, userId, status);
    return this.sendResponse(res, task);
  });
}
