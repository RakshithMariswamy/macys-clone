import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from './useLocalStorage';
import { APPOINTMENT, REGEX } from '../constants';

const INITIAL_FORM = {
  workedWithStylist: false,
  appointmentType: APPOINTMENT.TYPES[0], // 'Virtual'
  storeSearch: '',
  dateFirst: '',
  timeFirst: '',
  dateAlternate: '',
  timeAlternate: '',
  duration: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  shoppingFor: '',
  specialOccasion: '',
  styleDescription: '',
  additionalNotes: '',
};

const INITIAL_ERRORS = {};

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function validate(form) {
  const errors = {};

  if (!form.firstName.trim() || form.firstName.trim().length < 1)
    errors.firstName = 'First name is required.';

  if (!form.lastName.trim() || form.lastName.trim().length < 1)
    errors.lastName = 'Last name is required.';

  if (!form.phone.trim())
    errors.phone = 'Phone number is required.';

  if (!REGEX.EMAIL.test(form.email))
    errors.email = 'Please enter a valid email address.';

  if (!form.dateFirst)
    errors.dateFirst = 'Please select a date.';
  else if (form.dateFirst < getTodayStr())
    errors.dateFirst = 'Date cannot be in the past.';

  if (!form.timeFirst)
    errors.timeFirst = 'Please select a time.';

  if (!form.duration)
    errors.duration = 'Please select a session length.';

  return errors;
}

export function useAppointment(productContext) {
  const [appointments, setAppointments] = useLocalStorage(
    APPOINTMENT.LOCAL_STORAGE_KEY,
    []
  );
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState('idle');
  const [confirmation, setConfirmation] = useState(null);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const submit = useCallback(() => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setStatus('submitting');

    setTimeout(() => {
      const record = {
        customerId: uuidv4(),
        appointmentType: form.appointmentType,
        productContext: productContext || null,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        phone: form.phone.trim(),
        email: form.email.trim(),
        dateFirst: form.dateFirst,
        timeFirst: form.timeFirst,
        dateAlternate: form.dateAlternate,
        timeAlternate: form.timeAlternate,
        duration: form.duration,
        storeSearch: form.storeSearch,
        shoppingFor: form.shoppingFor,
        specialOccasion: form.specialOccasion,
        styleDescription: form.styleDescription.trim(),
        additionalNotes: form.additionalNotes.trim(),
        workedWithStylist: form.workedWithStylist,
        timestamp: new Date().toISOString(),
      };

      setAppointments((prev) => [...prev, record]);
      setConfirmation(record);
      setStatus('success');
    }, 1200);

    return true;
  }, [form, productContext, setAppointments]);

  const reset = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setStatus('idle');
    setConfirmation(null);
  }, []);

  return {
    form,
    errors,
    status,
    confirmation,
    appointments,
    updateField,
    submit,
    reset,
    getTodayStr,
  };
}
