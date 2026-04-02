import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { APPOINTMENT } from '../../constants';

// Shared select class builder
function selectClass(hasError, extra = '') {
  return [
    'w-full border rounded px-3 py-2.5 text-sm text-gray-700 bg-white appearance-none',
    'focus:outline-none focus:ring-1 transition-colors',
    hasError
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-gray-500 focus:ring-gray-400',
    extra,
  ].join(' ');
}

function inputClass(hasError) {
  return [
    'w-full border rounded px-3 py-2.5 text-sm text-gray-700 bg-white',
    'placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors',
    hasError
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-gray-500 focus:ring-gray-400',
  ].join(' ');
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <p role="alert" className="text-xs text-red-500 mt-1">{msg}</p>;
}

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5" aria-hidden>*</span>}
    </label>
  );
}

// Generate next 60 days as date options
function getDateOptions() {
  const options = [];
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const value = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    options.push({ value, label });
  }
  return options;
}

const DATE_OPTIONS = getDateOptions();

export function AppointmentForm({ form, errors, status, onUpdate, onSubmit }) {
  const isSubmitting = status === 'submitting';

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {/* Previously worked with stylist */}
      <div className="flex justify-center">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              checked={form.workedWithStylist}
              onChange={(e) => onUpdate('workedWithStylist', e.target.checked)}
              disabled={isSubmitting}
              className="sr-only peer"
            />
            <div className="w-5 h-5 border-2 border-gray-400 rounded peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center">
              {form.workedWithStylist && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-gray-700">I&apos;ve worked with a Macy&apos;s Personal Stylist before.</span>
        </label>
      </div>

      {/* Appointment type */}
      <div>
        <Label required>What type of appointment would you like?</Label>
        <div className="grid grid-cols-2 gap-3 mt-1">
          {APPOINTMENT.TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onUpdate('appointmentType', type)}
              disabled={isSubmitting}
              className={[
                'py-3 rounded text-sm font-medium border transition-all',
                form.appointmentType === type
                  ? 'bg-slate-500 text-white border-slate-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400',
              ].join(' ')}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Choose your store */}
      <div>
        <Label htmlFor="appt-store" required>Choose your store</Label>
        <div className="relative mt-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            id="appt-store"
            type="text"
            value={form.storeSearch}
            onChange={(e) => onUpdate('storeSearch', e.target.value)}
            placeholder="City or zip code"
            disabled={isSubmitting}
            className={[inputClass(false), 'pl-9'].join(' ')}
          />
        </div>
      </div>

      {/* Date & Time — first choice */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appt-date-first" required>Choose a date (first choice)</Label>
          <div className="relative mt-1">
            <select
              id="appt-date-first"
              value={form.dateFirst}
              onChange={(e) => onUpdate('dateFirst', e.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.dateFirst}
              className={selectClass(!!errors.dateFirst)}
            >
              <option value="">Date*</option>
              {DATE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
          <FieldError msg={errors.dateFirst} />
        </div>
        <div>
          <Label htmlFor="appt-time-first" required>Choose a time (first choice)</Label>
          <div className="relative mt-1">
            <select
              id="appt-time-first"
              value={form.timeFirst}
              onChange={(e) => onUpdate('timeFirst', e.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.timeFirst}
              className={selectClass(!!errors.timeFirst)}
            >
              <option value="">Time*</option>
              {APPOINTMENT.TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
          <FieldError msg={errors.timeFirst} />
        </div>
      </div>

      {/* Date & Time — alternate */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appt-date-alt" required>Choose a date (alternate)</Label>
          <div className="relative mt-1">
            <select
              id="appt-date-alt"
              value={form.dateAlternate}
              onChange={(e) => onUpdate('dateAlternate', e.target.value)}
              disabled={isSubmitting}
              className={selectClass(false)}
            >
              <option value="">Date*</option>
              {DATE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>
        <div>
          <Label htmlFor="appt-time-alt" required>Choose a time (alternate)</Label>
          <div className="relative mt-1">
            <select
              id="appt-time-alt"
              value={form.timeAlternate}
              onChange={(e) => onUpdate('timeAlternate', e.target.value)}
              disabled={isSubmitting}
              className={selectClass(false)}
            >
              <option value="">Time*</option>
              {APPOINTMENT.TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>
      </div>

      {/* Duration */}
      <div>
        <Label required>How much time do you have?</Label>
        <div className="grid grid-cols-3 gap-3 mt-1">
          {APPOINTMENT.DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onUpdate('duration', d)}
              disabled={isSubmitting}
              className={[
                'py-3 rounded text-sm border transition-all',
                form.duration === d
                  ? 'border-gray-900 bg-gray-900 text-white font-medium'
                  : 'border-gray-300 text-gray-700 bg-white hover:border-gray-400',
              ].join(' ')}
            >
              {d}
            </button>
          ))}
        </div>
        <FieldError msg={errors.duration} />
      </div>

      {/* Contact info */}
      <div>
        <Label required>Enter your contact info</Label>
        <div className="grid sm:grid-cols-2 gap-3 mt-1">
          <div>
            <input
              id="appt-first-name"
              type="text"
              value={form.firstName}
              onChange={(e) => onUpdate('firstName', e.target.value)}
              placeholder="First Name"
              disabled={isSubmitting}
              autoComplete="given-name"
              aria-label="First Name"
              className={inputClass(!!errors.firstName)}
            />
            <FieldError msg={errors.firstName} />
          </div>
          <div>
            <input
              id="appt-last-name"
              type="text"
              value={form.lastName}
              onChange={(e) => onUpdate('lastName', e.target.value)}
              placeholder="Last Name"
              disabled={isSubmitting}
              autoComplete="family-name"
              aria-label="Last Name"
              className={inputClass(!!errors.lastName)}
            />
            <FieldError msg={errors.lastName} />
          </div>
          <div>
            <input
              id="appt-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => onUpdate('phone', e.target.value)}
              placeholder="Phone"
              disabled={isSubmitting}
              autoComplete="tel"
              aria-label="Phone"
              className={inputClass(!!errors.phone)}
            />
            <FieldError msg={errors.phone} />
          </div>
          <div>
            <input
              id="appt-email"
              type="email"
              value={form.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              placeholder="Email"
              disabled={isSubmitting}
              autoComplete="email"
              aria-label="Email"
              className={inputClass(!!errors.email)}
            />
            <FieldError msg={errors.email} />
          </div>
        </div>
      </div>

      {/* Shopping for / Special occasion */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appt-shopping-for">What are you primarily shopping for?</Label>
          <div className="relative mt-1">
            <select
              id="appt-shopping-for"
              value={form.shoppingFor}
              onChange={(e) => onUpdate('shoppingFor', e.target.value)}
              disabled={isSubmitting}
              className={selectClass(false)}
            >
              <option value="">(Optional)</option>
              {APPOINTMENT.SHOPPING_FOR.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>
        <div>
          <Label htmlFor="appt-occasion">Any special occasion?</Label>
          <div className="relative mt-1">
            <select
              id="appt-occasion"
              value={form.specialOccasion}
              onChange={(e) => onUpdate('specialOccasion', e.target.value)}
              disabled={isSubmitting}
              className={selectClass(false)}
            >
              <option value="">(Optional)</option>
              {APPOINTMENT.SPECIAL_OCCASIONS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>
      </div>

      {/* Style description */}
      <div>
        <Label htmlFor="appt-style">How would you describe your style?</Label>
        <textarea
          id="appt-style"
          rows={3}
          value={form.styleDescription}
          onChange={(e) => onUpdate('styleDescription', e.target.value)}
          placeholder="(Optional)"
          disabled={isSubmitting}
          maxLength={500}
          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-700 bg-white resize-y placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-gray-500 focus:ring-gray-400 transition-colors mt-1"
        />
      </div>

      {/* Additional notes */}
      <div>
        <Label htmlFor="appt-notes">Anything else you want your stylist to know?</Label>
        <textarea
          id="appt-notes"
          rows={3}
          value={form.additionalNotes}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          placeholder="(Optional)"
          disabled={isSubmitting}
          maxLength={500}
          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-700 bg-white resize-y placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-gray-500 focus:ring-gray-400 transition-colors mt-1"
        />
      </div>

      {/* Privacy */}
      <p className="text-sm text-gray-500 text-center">
        By continuing, you agree to{' '}
        <a href="/" className="text-blue-600 underline hover:text-blue-800">Macy&apos;s Privacy Practices.</a>
      </p>

      <Button
        type="submit"
        variant="dark"
        size="lg"
        fullWidth
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting…' : 'Submit'}
      </Button>
    </form>
  );
}

// Inline chevron for selects
function ChevronDown() {
  return (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

AppointmentForm.propTypes = {
  form: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
};

FieldError.propTypes = {
  msg: PropTypes.string,
};
