import { useState, useCallback, useRef } from 'react';
import './App.css';
import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import Modal from './components/Modal/Modal';
import Toast from './components/Toast/Toast';
import useTasks from './hooks/useTasks';
import useFilter from './hooks/useFilter';

// ─── Toast Manager (simple internal hook) ──────────────────────────────────
let toastId = 0;
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return { toasts, addToast, removeToast };
};

// ─── App ────────────────────────────────────────────────────────────────────
function App() {
  const { tasks, stats, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const { filters, filteredTasks, updateFilter, resetFilters, hasActiveFilters } = useFilter(tasks);
  const { toasts, addToast, removeToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        await updateTask(editingTask._id, values);
        addToast('Task updated successfully!', 'success');
      } else {
        await createTask(values);
        addToast('Task created successfully!', 'success');
      }
      closeModal();
    } catch (err) {
      addToast(err.message || 'Failed to save task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      addToast('Task deleted.', 'info');
    } catch (err) {
      addToast(err.message || 'Failed to delete task', 'error');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      addToast(`Status changed to "${newStatus}"`, 'success', 2000);
    } catch (err) {
      addToast(err.message || 'Failed to update status', 'error');
    }
  };

  return (
    <div className="app">
      <div className="app-main">
        {/* Header */}
        <Header stats={stats} onAddTask={openCreateModal} />

        {/* Error Banner */}
        {error && (
          <div className="error-banner" role="alert">
            ⚠️ {error} — Make sure the server and MongoDB are running.
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
          taskCount={filteredTasks.length}
        />

        {/* Task Grid */}
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onAddTask={openCreateModal}
          hasFilters={hasActiveFilters}
        />
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingTask ? 'Edit Task' : 'New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
