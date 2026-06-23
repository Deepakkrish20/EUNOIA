import { Router } from 'express';
import { AnalyticsService } from './analytics.service.js';
import { AnalyticsController } from './analytics.controller.js';

const router = Router();

// Instantiate layers
const analyticsService = new AnalyticsService();
const analyticsController = new AnalyticsController(analyticsService);

// Bind Route Endpoints
router.get('/dashboard', analyticsController.getDashboardStats);
router.get('/goals', analyticsController.getGoalStats);
router.get('/tasks', analyticsController.getTaskStats);
router.get('/activities', analyticsController.getActivityStats);

export default router;
