import { useState, useCallback } from 'react';
import { validateTaskForm, isFormValid } from '../utils/validators';

/**
 * useValidation — manages form field errors and touched state.
 */
const useValidation = (isEdit = false) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback(
    (values) => {
      const errs = validateTaskForm(values, isEdit);
      setErrors(errs);
      return isFormValid(errs);
    },
    [isEdit]
  );

  const touchField = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateField = useCallback(
    (field, values) => {
      const errs = validateTaskForm(values, isEdit);
      setErrors((prev) => ({
        ...prev,
        [field]: errs[field],
      }));
    },
    [isEdit]
  );

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const getFieldError = (field) => (touched[field] ? errors[field] : undefined);

  return { errors, touched, validate, touchField, validateField, resetValidation, getFieldError };
};

export default useValidation;
