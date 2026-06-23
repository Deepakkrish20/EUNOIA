import { Router } from 'express';
import authRouter from '../modules/auth/index.js';
import usersRouter from '../modules/users/index.js';
import dashboardRouter from '../modules/dashboard/index.js';
import twinRouter from '../modules/twin/index.js';
import visionRouter from '../modules/vision/index.js';
import legacyRouter from '../modules/legacy/index.js';
import goalsRouter from '../modules/goals/index.js';
import tasksRouter from '../modules/tasks/index.js';
import learningRouter from '../modules/learning/index.js';
import assistantRouter from '../modules/assistant/index.js';
import analyticsRouter from '../modules/analytics/index.js';
import activitiesRouter from '../modules/activities/index.js';

import { requireAuth } from '../core/middleware/auth.middleware.js';

const router = Router();

// --- PUBLIC ROUTES ---
router.use('/auth', authRouter);

// --- PROTECTED ROUTES (Required Auth) ---
router.use('/users', requireAuth, usersRouter);
router.use('/dashboard', requireAuth, dashboardRouter);
router.use('/twin', requireAuth, twinRouter);
router.use('/vision', requireAuth, visionRouter);
router.use('/legacy', requireAuth, legacyRouter);
router.use('/goals', requireAuth, goalsRouter);
router.use('/tasks', requireAuth, tasksRouter);
router.use('/learning', requireAuth, learningRouter);
router.use('/assistant', requireAuth, assistantRouter);
router.use('/analytics', requireAuth, analyticsRouter);
router.use('/activities', requireAuth, activitiesRouter);

export default router;
