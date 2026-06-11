import styles from './FilterBar.module.css';
import { STATUSES, PRIORITIES, CATEGORIES, SORT_OPTIONS } from '../../utils/constants';

const FilterBar = ({ filters, onFilterChange, onReset, hasActiveFilters, taskCount }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.filters}>
          <Select
            id="filter-status"
            label="Status"
            value={filters.status}
            onChange={(v) => onFilterChange('status', v)}
            options={STATUSES}
            placeholder="All Statuses"
          />
          <Select
            id="filter-priority"
            label="Priority"
            value={filters.priority}
            onChange={(v) => onFilterChange('priority', v)}
            options={PRIORITIES}
            placeholder="All Priorities"
          />
          <Select
            id="filter-category"
            label="Category"
            value={filters.category}
            onChange={(v) => onFilterChange('category', v)}
            options={CATEGORIES}
            placeholder="All Categories"
          />
        </div>

        <div className={styles.sortGroup}>
          <Select
            id="sort-by"
            label="Sort"
            value={filters.sortBy}
            onChange={(v) => onFilterChange('sortBy', v)}
            options={SORT_OPTIONS.map((o) => o.value)}
            labels={SORT_OPTIONS.map((o) => o.label)}
          />
          <button
            id="sort-order-btn"
            className={styles.orderBtn}
            onClick={() => onFilterChange('order', filters.order === 'asc' ? 'desc' : 'asc')}
            title={`Sort ${filters.order === 'asc' ? 'descending' : 'ascending'}`}
            aria-label="Toggle sort order"
          >
            {filters.order === 'asc' ? '↑' : '↓'}
          </button>

          {hasActiveFilters && (
            <button id="reset-filters-btn" className={styles.resetBtn} onClick={onReset}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className={styles.resultInfo}>
        <span className={styles.count}>{taskCount} task{taskCount !== 1 ? 's' : ''}</span>
        {hasActiveFilters && <span className={styles.filtered}>filtered</span>}
      </div>
    </div>
  );
};

const Select = ({ id, label, value, onChange, options, labels, placeholder }) => (
  <div className={styles.selectWrapper}>
    <label htmlFor={id} className={styles.selectLabel}>{label}</label>
    <select
      id={id}
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt, i) => (
        <option key={opt} value={opt}>{labels ? labels[i] : opt}</option>
      ))}
    </select>
  </div>
);

export default FilterBar;
