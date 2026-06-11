import TaskCard from '../TaskCard/TaskCard';
import EmptyState from '../EmptyState/EmptyState';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange, onAddTask, hasFilters }) => {
  if (loading) {
    return (
      <div className={styles.loadingGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState hasFilters={hasFilters} onAddTask={onAddTask} />;
  }

  return (
    <div className={styles.grid}>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
