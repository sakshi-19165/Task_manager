import { useState, useMemo } from 'react';
import { isOverdue } from '../utils/dateUtils';

const DEFAULT_FILTERS = {
  status: '',
  priority: '',
  category: '',
  sortBy: 'createdAt',
  order: 'desc',
};

/**
 * useFilter — manages filter/sort state and derives the filtered task list client-side.
 */
const useFilter = (tasks = []) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Filter
    if (filters.status) {
      result = result.filter((t) => t.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority);
    }
    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    // Sort
    const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };
    result.sort((a, b) => {
      let valA, valB;
      switch (filters.sortBy) {
        case 'dueDate':
          valA = new Date(a.dueDate).getTime();
          valB = new Date(b.dueDate).getTime();
          break;
        case 'priority':
          valA = PRIORITY_ORDER[a.priority] ?? 99;
          valB = PRIORITY_ORDER[b.priority] ?? 99;
          break;
        case 'title':
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
          break;
        default:
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
      }

      if (valA < valB) return filters.order === 'asc' ? -1 : 1;
      if (valA > valB) return filters.order === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [tasks, filters]);

  const hasActiveFilters = Object.entries(filters).some(
    ([key, val]) => key !== 'sortBy' && key !== 'order' && val !== ''
  );

  const overdueCount = useMemo(
    () => tasks.filter((t) => isOverdue(t.dueDate, t.status)).length,
    [tasks]
  );

  return { filters, filteredTasks, updateFilter, resetFilters, hasActiveFilters, overdueCount };
};

export default useFilter;
