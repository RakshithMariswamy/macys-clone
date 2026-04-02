import PropTypes from 'prop-types';

const SIZES = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-3',
  xl: 'w-16 h-16 border-4',
};

export function LoadingSpinner({ size = 'md', color = 'border-macys-red', className = '' }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        'inline-block rounded-full border-t-transparent animate-spin',
        SIZES[size],
        color,
        className,
      ].join(' ')}
    />
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.string,
  className: PropTypes.string,
};
