import { Router } from 'express';
import { TaskRepository } from './task.repository.js';
import { TaskService } from './task.service.js';
import { TaskController } from './task.controller.js';
import { validateTask, validateTaskUpdate } from './task.validation.js';

const router = Router();

// Instantiate layers
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Bind Route Endpoints
router.get('/', taskController.getTasks);
router.get('/list', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);
router.put('/:id', validateTaskUpdate, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/complete', taskController.completeTask);
router.patch('/:id/status', validateTaskUpdate, taskController.updateTaskStatus);

export default router;
export { taskController }; // Export controller for cross-module route registration
