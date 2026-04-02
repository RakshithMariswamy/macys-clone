import PropTypes from 'prop-types';
import { LoadingSpinner } from './LoadingSpinner';

const VARIANTS = {
  primary: 'bg-macys-red text-white hover:bg-macys-red-dark focus:ring-macys-red border-transparent',
  secondary: 'bg-white text-macys-gray border-macys-gray hover:bg-macys-gray hover:text-white focus:ring-macys-gray',
  outline: 'bg-transparent text-macys-red border-macys-red hover:bg-macys-red hover:text-white focus:ring-macys-red',
  ghost: 'bg-transparent text-macys-gray border-transparent hover:bg-macys-gray-bg focus:ring-macys-gray',
  dark: 'bg-macys-gray text-white hover:bg-macys-black border-transparent focus:ring-macys-gray',
};

const SIZES = {
  sm: 'text-xs py-1.5 px-3',
  md: 'text-sm py-2.5 px-5',
  lg: 'text-base py-3 px-7',
  xl: 'text-lg py-4 px-8',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold border-2 rounded',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  size: PropTypes.oneOf(Object.keys(SIZES)),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};
