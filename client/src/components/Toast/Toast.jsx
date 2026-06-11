import { useEffect, useCallback } from 'react';
import styles from './Toast.module.css';

const ICONS = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
};

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className={styles.container} aria-live="polite" role="status">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const dismiss = useCallback(() => onRemove(toast.id), [toast.id, onRemove]);

  useEffect(() => {
    const timer = setTimeout(dismiss, toast.duration || 3500);
    return () => clearTimeout(timer);
  }, [dismiss, toast.duration]);

  return (
    <div className={`${styles.toast} ${styles[toast.type || 'info']}`} role="alert">
      <span className={styles.icon}>{ICONS[toast.type] || ICONS.info}</span>
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.closeBtn} onClick={dismiss} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
};

export default Toast;
