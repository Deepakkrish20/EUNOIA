import { Router } from 'express';
import { GoalRepository } from './goal.repository.js';
import { GoalService } from './goal.service.js';
import { GoalController } from './goal.controller.js';
import { validateGoal, validateGoalUpdate } from './goal.validation.js';
import { taskController } from '../tasks/task.routes.js';

const router = Router();

// Instantiate layers
const goalRepository = new GoalRepository();
const goalService = new GoalService(goalRepository);
const goalController = new GoalController(goalService);

// Bind Route Endpoints
router.get('/', goalController.getGoals);
router.get('/list', goalController.getGoals); // Support both list and base
router.get('/:id', goalController.getGoalById);
router.post('/', validateGoal, goalController.createGoal);
router.put('/:id', validateGoalUpdate, goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);
router.patch('/:id/complete', goalController.completeGoal);
router.patch('/:id/archive', goalController.archiveGoal);
router.get('/:goalId/tasks', taskController.getTasksByGoal);

export default router;
