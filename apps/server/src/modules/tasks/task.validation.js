/**
 * Validation Middleware for Task API Payloads.
 * Validates fields like title, status, priority, dueDate, and goalId.
 */

export function validateTask(req, res, next) {
  const { title, status, priority, dueDate, goalId } = req.body;
  const errors = [];

  // Title: required, string, non-empty
  if (!title || typeof title !== 'string') {
    errors.push('Title is required and must be a string');
  } else if (title.trim().length === 0) {
    errors.push('Title cannot be empty');
  }

  // Status: optional, valid enum (pending, in_progress, completed)
  if (status !== undefined) {
    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  // Priority: optional, valid enum (low, medium, high)
  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
    }
  }

  // Due Date: optional, valid date
  if (dueDate !== undefined && dueDate !== null) {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Due Date must be a valid date');
    }
  }

  // Goal ID: optional, string
  if (goalId !== undefined && goalId !== null) {
    if (typeof goalId !== 'string' || goalId.trim().length === 0) {
      errors.push('Goal ID must be a non-empty string');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: `Validation Error: ${errors.join('; ')}`,
        status: 400,
      },
    });
  }

  next();
}

export function validateTaskUpdate(req, res, next) {
  const { title, status, priority, dueDate, goalId } = req.body;
  const errors = [];

  // Title validation if present
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      errors.push('Title must be a string and cannot be empty');
    }
  }

  // Status validation if present
  if (status !== undefined) {
    const validStatuses = ['pending', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  // Priority validation if present
  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
    }
  }

  // Due Date validation if present
  if (dueDate !== undefined && dueDate !== null) {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Due Date must be a valid date');
    }
  }

  // Goal ID validation if present
  if (goalId !== undefined && goalId !== null) {
    if (typeof goalId !== 'string' || goalId.trim().length === 0) {
      errors.push('Goal ID must be a non-empty string');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: {
        message: `Validation Error: ${errors.join('; ')}`,
        status: 400,
      },
    });
  }

  next();
}
