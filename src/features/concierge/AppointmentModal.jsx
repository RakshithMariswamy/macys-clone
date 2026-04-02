import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { useAppointment } from '../../hooks/useAppointment';
import { AppointmentForm } from './AppointmentForm';
import { AppointmentConfirmation } from './AppointmentConfirmation';

function HangerIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M24 10a4 4 0 0 1 4 4c0 2-2 3.5-4 5L6 30h36L24 19c-2-1.5-4-3-4-5a4 4 0 0 1 4-4z" />
      <line x1="24" y1="6" x2="24" y2="10" />
      <path d="M27 6a3 3 0 0 1-6 0" />
    </svg>
  );
}

export function AppointmentModal({ isOpen, onClose, productId }) {
  const { form, errors, status, confirmation, updateField, submit, reset } =
    useAppointment(productId);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    function onKeyDown(e) {
      if (e.key === 'Escape') handleClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function handleClose() {
    reset();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appt-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={modalRef}
        className="relative bg-white w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-modal max-h-[95vh] flex flex-col animate-slide-up overflow-hidden"
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close appointment modal"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-4 px-8 flex-shrink-0">
          <div className="flex justify-center mb-3 text-gray-700">
            <HangerIcon />
          </div>
          <h2 id="appt-modal-title" className="text-3xl font-light tracking-tight text-gray-900">
            Book your appointment
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Just fill out the form below to get started.
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {status === 'success' && confirmation ? (
            <AppointmentConfirmation
              confirmation={confirmation}
              onClose={handleClose}
              onBookAnother={reset}
            />
          ) : (
            <AppointmentForm
              form={form}
              errors={errors}
              status={status}
              onUpdate={updateField}
              onSubmit={submit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

AppointmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.string,
  productName: PropTypes.string,
};
