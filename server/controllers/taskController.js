const Task = require('../models/Task');

// ─── GET /api/tasks ────────────────────────────────────────────────────────
const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, category, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    // Sort direction
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortField = ['dueDate', 'priority', 'createdAt', 'title'].includes(sortBy)
      ? sortBy
      : 'createdAt';

    const tasks = await Task.find(filter).sort({ [sortField]: sortOrder });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/tasks/stats ──────────────────────────────────────────────────
const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Task.countDocuments();
    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: 'Done' },
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        overdue,
        byStatus: stats.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
        byPriority: priorityStats.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/tasks/:id ────────────────────────────────────────────────────
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/tasks ───────────────────────────────────────────────────────
const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/tasks/:id ────────────────────────────────────────────────────
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/tasks/:id ─────────────────────────────────────────────────
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask, getTaskStats };
