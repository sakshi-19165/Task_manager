/**
 * Format a date string or Date object to a readable display string.
 * e.g. "Jun 15, 2025"
 */
export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Returns true if the given date is before today (and not Done).
 */
export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'Done') return false;
  return new Date(dueDate) < new Date();
};

/**
 * Returns a relative label for due dates: "Today", "Tomorrow", "3 days left", "2 days overdue", etc.
 */
export const getRelativeDueLabel = (dueDate, status) => {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (status === 'Done') return null;
  if (diffDays === 0) return { label: 'Due today', overdue: false, urgent: true };
  if (diffDays === 1) return { label: 'Due tomorrow', overdue: false, urgent: true };
  if (diffDays > 1) return { label: `${diffDays} days left`, overdue: false, urgent: diffDays <= 3 };
  return { label: `${Math.abs(diffDays)} days overdue`, overdue: true, urgent: true };
};

/**
 * Convert a Date or ISO string to the value format required by <input type="date">
 * i.e. "YYYY-MM-DD"
 */
export const toInputDateValue = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

/**
 * Returns today's date as a string in YYYY-MM-DD format (for min attribute on date inputs).
 */
export const todayString = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Format a time string (HH:mm) to 12-hour display (e.g. "2:30 PM")
 */
export const formatTime = (time) => {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
};

/**
 * Convert a Date/ISO string to the value format required by <input type="time"> (HH:mm)
 */
export const toInputTimeValue = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
