/**
 * Validates a task form object and returns an errors map.
 * @param {object} values - form field values
 * @param {boolean} isEdit - if true, due-date past check is relaxed
 * @returns {object} errors - field -> message
 */
export const validateTaskForm = (values, isEdit = false) => {
  const errors = {};

  // Title
  if (!values.title || !values.title.trim()) {
    errors.title = 'Title is required';
  } else if (values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (values.title.trim().length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }

  // Description
  if (values.description && values.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  // Priority
  const validPriorities = ['High', 'Medium', 'Low'];
  if (!values.priority) {
    errors.priority = 'Priority is required';
  } else if (!validPriorities.includes(values.priority)) {
    errors.priority = 'Invalid priority value';
  }

  // Status
  const validStatuses = ['Todo', 'In Progress', 'Done'];
  if (!values.status) {
    errors.status = 'Status is required';
  } else if (!validStatuses.includes(values.status)) {
    errors.status = 'Invalid status value';
  }

  // Category
  const validCategories = ['Work', 'Personal', 'Health', 'Finance', 'Education', 'General'];
  if (!values.category) {
    errors.category = 'Category is required';
  } else if (!validCategories.includes(values.category)) {
    errors.category = 'Invalid category';
  }

  // Due Date
  if (!values.dueDate) {
    errors.dueDate = 'Due date is required';
  } else {
    const selected = new Date(values.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selected.getTime())) {
      errors.dueDate = 'Due date must be a valid date';
    } else if (!isEdit && selected < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  return errors;
};

/**
 * Returns true if the errors object has no entries.
 */
export const isFormValid = (errors) => Object.keys(errors).length === 0;
