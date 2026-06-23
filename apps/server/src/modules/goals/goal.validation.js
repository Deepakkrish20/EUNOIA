/**
 * Validation Middleware for Goal API Payloads.
 * Validates fields like title, category, priority, and targetDate.
 */

export function validateGoal(req, res, next) {
  const { title, category, priority, targetDate, status } = req.body;
  const errors = [];

  // Title: required, string, min length 3
  if (!title || typeof title !== 'string') {
    errors.push('Title is required and must be a string');
  } else if (title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  // Category: required, string, non-empty
  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    errors.push('Category is required');
  }

  // Priority: valid enum (low, medium, high)
  const validPriorities = ['low', 'medium', 'high'];
  if (!priority) {
    errors.push('Priority is required');
  } else if (!validPriorities.includes(priority)) {
    errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
  }

  // Target Date: valid date, must be in the future
  if (!targetDate) {
    errors.push('Target Date is required');
  } else {
    const parsedDate = new Date(targetDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Target Date must be a valid date');
    } else if (parsedDate <= new Date()) {
      errors.push('Target Date must be a future date');
    }
  }

  // Status: optional, valid enum (active, completed, archived)
  if (status !== undefined) {
    const validStatuses = ['active', 'completed', 'archived'];
    if (!validStatuses.includes(status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
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

export function validateGoalUpdate(req, res, next) {
  const { title, category, priority, targetDate, status } = req.body;
  const errors = [];

  // Title validation if present
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length < 3) {
      errors.push('Title must be a string and at least 3 characters long');
    }
  }

  // Category validation if present
  if (category !== undefined) {
    if (typeof category !== 'string' || category.trim().length === 0) {
      errors.push('Category cannot be empty');
    }
  }

  // Priority validation if present
  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
    }
  }

  // Target Date validation if present
  if (targetDate !== undefined) {
    const parsedDate = new Date(targetDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Target Date must be a valid date');
    } else if (parsedDate <= new Date()) {
      errors.push('Target Date must be a future date');
    }
  }

  // Status validation if present
  if (status !== undefined) {
    const validStatuses = ['active', 'completed', 'archived'];
    if (!validStatuses.includes(status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
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
