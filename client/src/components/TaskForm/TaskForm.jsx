import { useState, useEffect } from 'react';
import styles from './TaskForm.module.css';
import useValidation from '../../hooks/useValidation';
import { PRIORITIES, STATUSES, CATEGORIES, DEFAULT_TASK_FORM } from '../../utils/constants';
import { toInputDateValue, toInputTimeValue, todayString } from '../../utils/dateUtils';

const TaskForm = ({ task, onSubmit, onCancel, isSubmitting }) => {
  const isEdit = !!task;
  const [values, setValues] = useState(
    isEdit
      ? { ...task, dueDate: toInputDateValue(task.dueDate), dueTime: toInputTimeValue(task.dueDate) }
      : DEFAULT_TASK_FORM
  );

  const { errors, touched, validate, touchField, validateField, resetValidation } =
    useValidation(isEdit);

  useEffect(() => {
    if (task) {
      setValues({ ...task, dueDate: toInputDateValue(task.dueDate), dueTime: toInputTimeValue(task.dueDate) });
    } else {
      setValues(DEFAULT_TASK_FORM);
    }
    resetValidation();
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) validateField(name, next);
  };

  const handleBlur = (e) => {
    touchField(e.target.name);
    validateField(e.target.name, values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Touch all fields
    Object.keys(values).forEach(touchField);
    const valid = validate(values);
    if (!valid) return;
    // Combine dueDate + dueTime into a single ISO date
    const { dueTime, ...submitValues } = values;
    if (submitValues.dueDate && dueTime) {
      submitValues.dueDate = `${submitValues.dueDate}T${dueTime}`;
    }
    onSubmit(submitValues);
  };

  const getFieldState = (field) =>
    touched[field] && errors[field] ? styles.fieldError : '';

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      id="task-form"
    >
      {/* Title */}
      <div className={styles.fieldGroup}>
        <label htmlFor="task-title" className={styles.label}>
          Title <span className={styles.required}>*</span>
        </label>
        <input
          id="task-title"
          name="title"
          type="text"
          className={`${styles.input} ${getFieldState('title')}`}
          placeholder="e.g. Complete project proposal"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={100}
          autoFocus
        />
        {touched.title && errors.title && (
          <span className={styles.errorMsg} role="alert">{errors.title}</span>
        )}
        <span className={styles.charCount}>{values.title.length}/100</span>
      </div>

      {/* Description */}
      <div className={styles.fieldGroup}>
        <label htmlFor="task-description" className={styles.label}>Description</label>
        <textarea
          id="task-description"
          name="description"
          className={`${styles.textarea} ${getFieldState('description')}`}
          placeholder="Add more details about this task (optional)"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={500}
          rows={3}
        />
        {touched.description && errors.description && (
          <span className={styles.errorMsg} role="alert">{errors.description}</span>
        )}
        <span className={styles.charCount}>{(values.description || '').length}/500</span>
      </div>

      {/* Row: Priority + Status */}
      <div className={styles.row}>
        <div className={styles.fieldGroup}>
          <label htmlFor="task-priority" className={styles.label}>
            Priority <span className={styles.required}>*</span>
          </label>
          <select
            id="task-priority"
            name="priority"
            className={`${styles.select} ${getFieldState('priority')}`}
            value={values.priority}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {touched.priority && errors.priority && (
            <span className={styles.errorMsg} role="alert">{errors.priority}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="task-status" className={styles.label}>
            Status <span className={styles.required}>*</span>
          </label>
          <select
            id="task-status"
            name="status"
            className={`${styles.select} ${getFieldState('status')}`}
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {touched.status && errors.status && (
            <span className={styles.errorMsg} role="alert">{errors.status}</span>
          )}
        </div>
      </div>

      {/* Row: Category + Due Date */}
      <div className={styles.row}>
        <div className={styles.fieldGroup}>
          <label htmlFor="task-category" className={styles.label}>
            Category <span className={styles.required}>*</span>
          </label>
          <select
            id="task-category"
            name="category"
            className={`${styles.select} ${getFieldState('category')}`}
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {touched.category && errors.category && (
            <span className={styles.errorMsg} role="alert">{errors.category}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="task-dueDate" className={styles.label}>
            Due Date <span className={styles.required}>*</span>
          </label>
          <input
            id="task-dueDate"
            name="dueDate"
            type="date"
            className={`${styles.input} ${getFieldState('dueDate')}`}
            value={values.dueDate}
            min={isEdit ? undefined : todayString()}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.dueDate && errors.dueDate && (
            <span className={styles.errorMsg} role="alert">{errors.dueDate}</span>
          )}
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="task-dueTime" className={styles.label}>
            Due Time
          </label>
          <input
            id="task-dueTime"
            name="dueTime"
            type="time"
            className={`${styles.input} ${getFieldState('dueTime')}`}
            value={values.dueTime}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
          disabled={isSubmitting}
          id="form-cancel-btn"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
          id="form-submit-btn"
        >
          {isSubmitting ? (
            <>
              <span className={styles.btnSpinner} /> Saving…
            </>
          ) : (
            isEdit ? '✅ Save Changes' : '✨ Create Task'
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
