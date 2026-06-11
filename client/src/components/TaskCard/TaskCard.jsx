import { useState } from 'react';
import styles from './TaskCard.module.css';
import StatusBadge from '../StatusBadge/StatusBadge';
import PriorityIndicator from '../PriorityIndicator/PriorityIndicator';
import { formatDate, formatTime, isOverdue, getRelativeDueLabel } from '../../utils/dateUtils';
import { CATEGORY_ICONS } from '../../utils/constants';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const overdue = isOverdue(task.dueDate, task.status);
  const relLabel = getRelativeDueLabel(task.dueDate, task.status);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(task._id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const cycleStatus = () => {
    const statuses = ['Todo', 'In Progress', 'Done'];
    const next = statuses[(statuses.indexOf(task.status) + 1) % statuses.length];
    onStatusChange(task._id, next);
  };

  return (
    <article
      className={`${styles.card} ${overdue ? styles.overdue : ''} ${task.status === 'Done' ? styles.done : ''}`}
      style={{ '--priority-color': getPriorityColor(task.priority) }}
    >
      {/* Priority stripe */}
      <div className={styles.stripe} />

      <div className={styles.body}>
        {/* Top row */}
        <div className={styles.topRow}>
          <span className={styles.category}>
            {CATEGORY_ICONS[task.category]} {task.category}
          </span>
          <PriorityIndicator priority={task.priority} showLabel={false} />
        </div>

        {/* Title */}
        <h3 className={`${styles.title} ${task.status === 'Done' ? styles.strikethrough : ''}`}>
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}

        {/* Status + Due Date row */}
        <div className={styles.metaRow}>
          <button
            className={styles.statusCycle}
            onClick={cycleStatus}
            title="Click to advance status"
            aria-label={`Status: ${task.status}. Click to advance.`}
          >
            <StatusBadge status={task.status} />
          </button>

          {relLabel && (
            <span
              className={`${styles.dueLabel} ${relLabel.overdue ? styles.dueLabelOverdue : ''} ${relLabel.urgent && !relLabel.overdue ? styles.dueLabelUrgent : ''}`}
            >
              📅 {relLabel.label}{task.dueDate && formatTime(new Date(task.dueDate).toTimeString().slice(0,5)) ? ` at ${formatTime(new Date(task.dueDate).toTimeString().slice(0,5))}` : ''}
            </span>
          )}
          {!relLabel && task.dueDate && (
            <span className={styles.dueDate}>📅 {formatDate(task.dueDate)}{task.dueDate && formatTime(new Date(task.dueDate).toTimeString().slice(0,5)) ? ` at ${formatTime(new Date(task.dueDate).toTimeString().slice(0,5))}` : ''}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          id={`edit-task-${task._id}`}
          className={styles.editBtn}
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${task.title}`}
        >
          ✏️ Edit
        </button>
        <button
          id={`delete-task-${task._id}`}
          className={`${styles.deleteBtn} ${confirmDelete ? styles.confirmDelete : ''}`}
          onClick={handleDelete}
          aria-label={`Delete task: ${task.title}`}
        >
          {confirmDelete ? '⚠️ Confirm?' : '🗑️ Delete'}
        </button>
      </div>
    </article>
  );
};

const getPriorityColor = (priority) => {
  const map = { High: '#ef4444', Medium: '#f59e0b', Low: '#22c55e' };
  return map[priority] || '#6366f1';
};

export default TaskCard;
