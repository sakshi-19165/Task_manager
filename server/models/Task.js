const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Priority must be High, Medium, or Low',
      },
      default: 'Medium',
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Todo', 'In Progress', 'Done'],
        message: 'Status must be Todo, In Progress, or Done',
      },
      default: 'Todo',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Work', 'Personal', 'Health', 'Finance', 'Education', 'General'],
        message: 'Invalid category',
      },
      default: 'General',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast filtering
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ category: 1 });
TaskSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Task', TaskSchema);
