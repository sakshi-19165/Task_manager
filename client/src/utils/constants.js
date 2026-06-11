// ─── Enums ────────────────────────────────────────────────────────────────
export const PRIORITIES = ['High', 'Medium', 'Low'];

export const STATUSES = ['Todo', 'In Progress', 'Done'];

export const CATEGORIES = ['Work', 'Personal', 'Health', 'Finance', 'Education', 'General'];

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title (A–Z)' },
];

// ─── Color Maps ───────────────────────────────────────────────────────────
export const PRIORITY_COLORS = {
  High: 'var(--color-high)',
  Medium: 'var(--color-medium)',
  Low: 'var(--color-low)',
};

export const PRIORITY_BG = {
  High: 'var(--color-high-bg)',
  Medium: 'var(--color-medium-bg)',
  Low: 'var(--color-low-bg)',
};

export const STATUS_COLORS = {
  'Todo': 'var(--color-todo)',
  'In Progress': 'var(--color-inprogress)',
  'Done': 'var(--color-done)',
};

export const STATUS_BG = {
  'Todo': 'var(--color-todo-bg)',
  'In Progress': 'var(--color-inprogress-bg)',
  'Done': 'var(--color-done-bg)',
};

export const CATEGORY_ICONS = {
  Work: '💼',
  Personal: '🧑',
  Health: '🏥',
  Finance: '💰',
  Education: '📚',
  General: '📋',
};

// ─── Default Form Values ──────────────────────────────────────────────────
export const DEFAULT_TASK_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Todo',
  category: 'General',
  dueDate: '',
  dueTime: '',
};
