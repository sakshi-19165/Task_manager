import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const Header = ({ stats, onAddTask }) => {
  const total = stats?.total ?? 0;
  const done = stats?.byStatus?.Done ?? 0;
  const overdue = stats?.overdue ?? 0;
  const inProgress = stats?.byStatus?.['In Progress'] ?? 0;

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskflow-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskflow-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => t === 'dark' ? 'light' : 'dark');

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoMark}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="url(#grad)"/>
            <path d="M8 14l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="28" y2="28">
                <stop stopColor="#6366f1"/>
                <stop offset="1" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <h1 className={styles.title}>TaskFlow</h1>
          <p className={styles.subtitle}>Stay organized, stay ahead</p>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{total}</span>
          <span className={styles.statLabel}>Total</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <span className={styles.statValue} style={{ color: 'var(--color-inprogress)' }}>{inProgress}</span>
          <span className={styles.statLabel}>Active</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.statItem}>
          <span className={styles.statValue} style={{ color: 'var(--color-done)' }}>{done}</span>
          <span className={styles.statLabel}>Done</span>
        </div>
        {overdue > 0 && (
          <>
            <div className={styles.divider} />
            <div className={styles.statItem}>
              <span className={styles.statValue} style={{ color: 'var(--color-overdue)' }}>{overdue}</span>
              <span className={styles.statLabel}>Overdue</span>
            </div>
          </>
        )}
      </div>

      <button
        id="theme-toggle-btn"
        className={styles.themeBtn}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <button
        id="add-task-btn"
        className={styles.addBtn}
        onClick={onAddTask}
        aria-label="Add new task"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
        Add Task
      </button>
    </header>
  );
};

export default Header;
