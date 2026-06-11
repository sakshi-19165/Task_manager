const { body, param, query, validationResult } = require('express-validator');

// ─── Middleware to check validation results ────────────────────────────────
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

// ─── Validate ObjectId ─────────────────────────────────────────────────────
const validateObjectId = [
  param('id').isMongoId().withMessage('Invalid task ID format'),
  handleValidationErrors,
];

// ─── Create Task Validation ────────────────────────────────────────────────
const validateCreateTask = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

  body('priority')
    .notEmpty().withMessage('Priority is required')
    .isIn(['High', 'Medium', 'Low']).withMessage('Priority must be High, Medium, or Low'),

  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['Todo', 'In Progress', 'Done']).withMessage('Status must be Todo, In Progress, or Done'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Work', 'Personal', 'Health', 'Finance', 'Education', 'General'])
    .withMessage('Invalid category value'),

  body('dueDate')
    .notEmpty().withMessage('Due date is required')
    .isISO8601().withMessage('Due date must be a valid date'),

  handleValidationErrors,
];

// ─── Update Task Validation ────────────────────────────────────────────────
const validateUpdateTask = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

  body('priority')
    .optional()
    .isIn(['High', 'Medium', 'Low']).withMessage('Priority must be High, Medium, or Low'),

  body('status')
    .optional()
    .isIn(['Todo', 'In Progress', 'Done']).withMessage('Status must be Todo, In Progress, or Done'),

  body('category')
    .optional()
    .isIn(['Work', 'Personal', 'Health', 'Finance', 'Education', 'General'])
    .withMessage('Invalid category value'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date'),

  handleValidationErrors,
];

module.exports = { validateCreateTask, validateUpdateTask, validateObjectId };
