import styles from './EmptyState.module.css';

const EmptyState = ({ hasFilters, onAddTask }) => {
  return (
    <div className={styles.container}>
      <div className={styles.illustration}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="58" stroke="rgba(99,102,241,0.15)" strokeWidth="2"/>
          <circle cx="60" cy="60" r="44" fill="rgba(99,102,241,0.06)"/>
          <rect x="36" y="42" width="48" height="6" rx="3" fill="rgba(99,102,241,0.25)"/>
          <rect x="36" y="54" width="36" height="6" rx="3" fill="rgba(99,102,241,0.15)"/>
          <rect x="36" y="66" width="28" height="6" rx="3" fill="rgba(99,102,241,0.1)"/>
          <circle cx="85" cy="38" r="16" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5"/>
          <text x="85" y="44" textAnchor="middle" fontSize="16" fill="rgba(139,92,246,0.7)">?</text>
        </svg>
      </div>
      <h3 className={styles.title}>
        {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
      </h3>
      <p className={styles.description}>
        {hasFilters
          ? 'Try adjusting or clearing your filters to see more tasks.'
          : 'Get started by creating your first task. Stay organized and productive!'}
      </p>
      {!hasFilters && (
        <button className={styles.cta} onClick={onAddTask} id="empty-state-add-btn">
          <span>+</span> Create First Task
        </button>
      )}
    </div>
  );
};

export default EmptyState;
