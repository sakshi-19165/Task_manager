import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Response interceptor — unwrap data or format errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ─── Task Service ──────────────────────────────────────────────────────────
const taskService = {
  /** Fetch all tasks, optionally filtered/sorted */
  getAll: (params = {}) => api.get('/tasks', { params }),

  /** Fetch a single task by ID */
  getById: (id) => api.get(`/tasks/${id}`),

  /** Create a new task */
  create: (data) => api.post('/tasks', data),

  /** Update an existing task */
  update: (id, data) => api.put(`/tasks/${id}`, data),

  /** Delete a task */
  delete: (id) => api.delete(`/tasks/${id}`),

  /** Fetch dashboard statistics */
  getStats: () => api.get('/tasks/stats'),
};

export default taskService;
