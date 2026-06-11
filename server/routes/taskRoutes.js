const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const { validateCreateTask, validateUpdateTask, validateObjectId } = require('../middleware/validation');

// Stats route must come before /:id to avoid conflict
router.get('/stats', getTaskStats);

router.route('/')
  .get(getAllTasks)
  .post(validateCreateTask, createTask);

router.route('/:id')
  .get(validateObjectId, getTaskById)
  .put(validateObjectId, validateUpdateTask, updateTask)
  .delete(validateObjectId, deleteTask);

module.exports = router;
