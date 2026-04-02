import PropTypes from 'prop-types';

export function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  autoComplete,
  min,
  max,
}) {
  return (
    <div className={['flex flex-col gap-1', className].join(' ')}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-macys-gray">
          {label}
          {required && <span className="text-macys-red ml-1" aria-hidden>*</span>}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        min={min}
        max={max}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          'border rounded px-3 py-2 text-sm text-macys-gray w-full',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-1',
          error
            ? 'border-macys-red focus:ring-macys-red'
            : 'border-macys-gray-border focus:border-macys-red focus:ring-macys-red',
          disabled ? 'bg-macys-gray-bg cursor-not-allowed opacity-70' : 'bg-white',
          inputClassName,
        ].join(' ')}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-macys-red mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  autoComplete: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
};
