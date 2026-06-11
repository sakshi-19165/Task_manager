import { useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';

/**
 * useTasks — manages task list state and all CRUD operations.
 * Returns: { tasks, stats, loading, error, createTask, updateTask, deleteTask, refreshTasks }
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskService.getAll(params);
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await taskService.getStats();
      setStats(response.data);
    } catch {
      // Stats are non-critical, fail silently
    }
  }, []);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  const createTask = useCallback(async (data) => {
    const response = await taskService.create(data);
    setTasks((prev) => [response.data, ...prev]);
    fetchStats();
    return response.data;
  }, [fetchStats]);

  const updateTask = useCallback(async (id, data) => {
    const response = await taskService.update(id, data);
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? response.data : t))
    );
    fetchStats();
    return response.data;
  }, [fetchStats]);

  const deleteTask = useCallback(async (id) => {
    await taskService.delete(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    fetchStats();
  }, [fetchStats]);

  const refreshTasks = useCallback((params) => {
    fetchTasks(params);
    fetchStats();
  }, [fetchTasks, fetchStats]);

  return { tasks, stats, loading, error, createTask, updateTask, deleteTask, refreshTasks };
};

export default useTasks;
