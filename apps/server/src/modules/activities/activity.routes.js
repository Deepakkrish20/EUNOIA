import { Router } from 'express';
import { ActivityRepository } from './activity.repository.js';
import { ActivityService } from './activity.service.js';
import { ActivityController } from './activity.controller.js';
import { validatePagination } from './activity.validation.js';

const router = Router();

// Instantiate layers
const activityRepository = new ActivityRepository();
const activityService = new ActivityService(activityRepository);
const activityController = new ActivityController(activityService);

// Bind Route Endpoints
router.get('/', validatePagination, activityController.getActivities);
router.get('/recent', activityController.getRecentActivities);
router.get('/:id', activityController.getActivityById);

export default router;
