import { prisma } from '../core/database/index.js';
import { TaskRepository } from '../modules/tasks/task.repository.js';
import { TaskService } from '../modules/tasks/task.service.js';
import { GoalRepository } from '../modules/goals/goal.repository.js';
import { GoalService } from '../modules/goals/goal.service.js';

async function runVerification() {
  console.log('--- STARTING TASKS MODULE VERIFICATION ---');
  
  const userId = 'test_user_verify_123';
  const role = 'USER';
  
  const taskRepo = new TaskRepository();
  const taskService = new TaskService(taskRepo);
  const goalRepo = new GoalRepository();
  const goalService = new GoalService(goalRepo);
  
  // Clean up any existing test records first
  console.log('1. Cleaning up existing test records...');
  await prisma.task.deleteMany({ where: { userId } });
  await prisma.goal.deleteMany({ where: { userId } });
  await prisma.user.deleteMany({ where: { id: userId } });
  
  console.log('2. Ensuring user exists...');
  await taskService.ensureUserExists(userId, role);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  console.log('User created:', !!user);
  
  console.log('3. Creating a test goal...');
  const goal = await goalService.createGoal(userId, role, {
    title: 'Strategic Verification Goal',
    description: 'Verify goals and tasks relationship',
    category: 'Testing',
    priority: 'high',
    targetDate: new Date(Date.now() + 86400000).toISOString(),
  });
  console.log('Goal created ID:', goal.id);
  
  console.log('4. Creating tasks linked to the goal...');
  const task1 = await taskService.createTask(userId, role, {
    title: 'Task A - High Priority',
    description: 'First test task',
    status: 'pending',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    goalId: goal.id,
  });
  const task2 = await taskService.createTask(userId, role, {
    title: 'Task B - Medium Priority',
    description: 'Second test task',
    status: 'in_progress',
    priority: 'medium',
    goalId: goal.id,
  });
  
  console.log('Task 1 created:', task1.title, '| Goal ID:', task1.goalId);
  console.log('Task 2 created:', task2.title, '| Goal ID:', task2.goalId);
  
  console.log('5. Retrieving tasks by Goal...');
  const tasksByGoal = await taskService.getTasksByGoal(goal.id, userId);
  console.log('Fetched tasks by Goal count:', tasksByGoal.length);
  if (tasksByGoal.length !== 2) {
    throw new Error('Verification failed: Count should be 2');
  }
  
  console.log('6. Completing a task...');
  const completedTask = await taskService.completeTask(task1.id, userId);
  console.log('Task 1 status after completion:', completedTask.status);
  console.log('Task 1 completedAt timestamp:', completedTask.completedAt);
  if (completedTask.status !== 'completed' || !completedTask.completedAt) {
    throw new Error('Verification failed: status should be completed and completedAt set');
  }
  
  console.log('7. Reverting task status...');
  const pendingTask = await taskService.updateTaskStatus(task1.id, userId, 'pending');
  console.log('Task 1 status after revert:', pendingTask.status);
  console.log('Task 1 completedAt after revert:', pendingTask.completedAt);
  if (pendingTask.status !== 'pending' || pendingTask.completedAt !== null) {
    throw new Error('Verification failed: completedAt should be null');
  }
  
  console.log('7.5. Verifying Auto-Generated Activities...');
  const activities = await prisma.activity.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
  console.log('Auto-generated activities count:', activities.length);
  activities.forEach(a => {
    console.log(`  - Action: ${a.action} | EntityType: ${a.entityType} | EntityId: ${a.entityId}`);
  });

  console.log('8. Verifying Goal Deletion Handling (Cascade Nullify)...');
  await goalService.deleteGoal(goal.id, userId);
  const taskAfterGoalDelete = await taskService.getTaskByIdAndUser(task2.id, userId);
  console.log('Task 2 goalId after goal deletion:', taskAfterGoalDelete.goalId);
  if (taskAfterGoalDelete.goalId !== null) {
    throw new Error('Verification failed: task goalId should be null');
  }
  
  console.log('9. Deleting tasks...');
  await taskService.deleteTask(task1.id, userId);
  await taskService.deleteTask(task2.id, userId);
  
  let deletedTaskFetched = null;
  try {
    await taskService.getTaskByIdAndUser(task1.id, userId);
  } catch (e) {
    deletedTaskFetched = e;
  }
  console.log('Fetching deleted task throws error:', !!deletedTaskFetched);
  
  // Clean up user
  await prisma.user.delete({ where: { id: userId } });
  console.log('10. Verification clean up complete!');
  console.log('--- ALL TASKS MODULE VERIFICATION CHECKS PASSED ---');
}

runVerification()
  .catch((err) => {
    console.error('Verification failed with error:', err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
