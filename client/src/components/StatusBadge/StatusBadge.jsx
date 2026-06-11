import styles from './StatusBadge.module.css';
import { STATUS_COLORS, STATUS_BG } from '../../utils/constants';

const StatusBadge = ({ status }) => {
  return (
    <span
      className={styles.badge}
      style={{
        color: STATUS_COLORS[status],
        background: STATUS_BG[status],
        borderColor: `${STATUS_COLORS[status]}30`,
      }}
    >
      <span className={styles.dot} style={{ background: STATUS_COLORS[status] }} />
      {status}
    </span>
  );
};

export default StatusBadge;
