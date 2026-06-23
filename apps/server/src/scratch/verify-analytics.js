import { prisma } from '../core/database/index.js';
import { AnalyticsService } from '../modules/analytics/analytics.service.js';
import { GoalService } from '../modules/goals/goal.service.js';
import { GoalRepository } from '../modules/goals/goal.repository.js';
import { TaskService } from '../modules/tasks/task.service.js';
import { TaskRepository } from '../modules/tasks/task.repository.js';

async function runVerification() {
  console.log('--- STARTING ANALYTICS MODULE VERIFICATION ---');

  const userId = 'analytics_test_user_99';
  const role = 'USER';

  const analyticsService = new AnalyticsService();
  const goalRepo = new GoalRepository();
  const goalService = new GoalService(goalRepo);
  const taskRepo = new TaskRepository();
  const taskService = new TaskService(taskRepo);

  // 1. Clean up existing test records
  console.log('1. Cleaning up existing test records...');
  await prisma.activity.deleteMany({ where: { userId } });
  await prisma.task.deleteMany({ where: { userId } });
  await prisma.goal.deleteMany({ where: { userId } });
  await prisma.user.deleteMany({ where: { id: userId } });

  // 2. Setup user
  console.log('2. Provisioning test user...');
  await goalService.ensureUserExists(userId, role);

  // 3. Create test goals (1 completed, 1 active)
  console.log('3. Creating objectives...');
  const goal1 = await goalService.createGoal(userId, role, {
    title: 'Completed Goal',
    description: 'Verify 100% completions',
    category: 'Testing',
    priority: 'low',
    targetDate: new Date(Date.now() + 86400000).toISOString(),
    status: 'completed',
  });
  // Manually update status to completed to set completedAt properly in database
  await prisma.goal.update({
    where: { id: goal1.id },
    data: { status: 'completed', completedAt: new Date() }
  });

  const goal2 = await goalService.createGoal(userId, role, {
    title: 'Active Goal',
    description: 'Verify active tracking',
    category: 'Testing',
    priority: 'medium',
    targetDate: new Date(Date.now() + 86400000).toISOString(),
    status: 'active',
  });

  // 4. Create tasks (1 completed, 2 pending, 1 in_progress)
  console.log('4. Creating operational tasks...');
  const t1 = await taskService.createTask(userId, role, {
    title: 'Completed Task',
    status: 'completed',
    priority: 'low',
    goalId: goal2.id,
  });
  const t2 = await taskService.createTask(userId, role, {
    title: 'Pending Task A',
    status: 'pending',
    priority: 'medium',
    goalId: goal2.id,
  });
  const t3 = await taskService.createTask(userId, role, {
    title: 'Pending Task B',
    status: 'pending',
    priority: 'high',
    goalId: goal2.id,
  });
  const t4 = await taskService.createTask(userId, role, {
    title: 'In Progress Task',
    status: 'in_progress',
    priority: 'medium',
    goalId: goal2.id,
  });

  // 5. Verify Goal Stats
  console.log('5. Verifying Goal Analytics...');
  const goalStats = await analyticsService.getGoalStats(userId);
  console.log('Goal stats output:', goalStats);
  if (goalStats.totalGoals !== 2) throw new Error('Expected 2 goals');
  if (goalStats.completedGoals !== 1) throw new Error('Expected 1 completed goal');
  if (goalStats.goalCompletionRate !== 50.0) throw new Error('Expected 50.00% goal completion rate');

  // 6. Verify Task Stats
  console.log('6. Verifying Task Analytics...');
  const taskStats = await analyticsService.getTaskStats(userId);
  console.log('Task stats output:', taskStats);
  if (taskStats.totalTasks !== 4) throw new Error('Expected 4 tasks');
  if (taskStats.completedTasks !== 1) throw new Error('Expected 1 completed task');
  if (taskStats.pendingTasks !== 2) throw new Error('Expected 2 pending tasks');
  if (taskStats.inProgressTasks !== 1) throw new Error('Expected 1 in_progress task');
  if (taskStats.taskCompletionRate !== 25.0) throw new Error('Expected 25.00% task completion rate');

  // 7. Verify Activity Stats & Recent Summary
  console.log('7. Verifying Activity Analytics...');
  const activityStats = await analyticsService.getActivityStats(userId);
  console.log('Activity stats output:', activityStats);
  if (activityStats.totalActivities === 0) throw new Error('Expected non-zero activity log records');
  if (activityStats.activitiesToday === 0) throw new Error('Expected non-zero activities today');

  // 8. Verify Dashboard aggregate stats
  console.log('8. Verifying Dashboard telemetry aggregation...');
  const dashboardStats = await analyticsService.getDashboardStats(userId);
  console.log('Dashboard stats output:', dashboardStats);
  if (dashboardStats.goalCompletionRate !== 50.0) throw new Error('Aggregation failed on Goal Completion Rate');
  if (dashboardStats.taskCompletionRate !== 25.0) throw new Error('Aggregation failed on Task Completion Rate');

  // 9. Clean up
  console.log('9. Cleaning up test user assets...');
  await prisma.activity.deleteMany({ where: { userId } });
  await prisma.task.deleteMany({ where: { userId } });
  await prisma.goal.deleteMany({ where: { userId } });
  await prisma.user.deleteMany({ where: { id: userId } });

  console.log('--- ALL DASHBOARD ANALYTICS VERIFICATION CHECKS PASSED ---');
}

runVerification()
  .catch((err) => {
    console.error('Analytics Verification failed with error:', err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
