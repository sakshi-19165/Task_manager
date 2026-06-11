import styles from './PriorityIndicator.module.css';
import { PRIORITY_COLORS } from '../../utils/constants';

const PRIORITY_LABELS = {
  High: '↑ High',
  Medium: '→ Medium',
  Low: '↓ Low',
};

const PriorityIndicator = ({ priority, showLabel = true }) => {
  const color = PRIORITY_COLORS[priority];
  return (
    <span
      className={styles.indicator}
      style={{ color }}
      title={`Priority: ${priority}`}
    >
      <span className={styles.dot} style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      {showLabel && <span className={styles.label}>{PRIORITY_LABELS[priority]}</span>}
    </span>
  );
};

export default PriorityIndicator;
