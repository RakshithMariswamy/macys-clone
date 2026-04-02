import PropTypes from 'prop-types';

function fmt(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function PriceDisplay({ price, size = 'md', className = '' }) {
  const hasSale = price.sale != null && price.sale < price.regular;
  const savings = hasSale ? price.regular - price.sale : 0;
  const savingsPercent = hasSale ? Math.round((savings / price.regular) * 100) : 0;

  const sizeClasses = {
    sm: { sale: 'text-base', reg: 'text-sm', label: 'text-xs' },
    md: { sale: 'text-2xl', reg: 'text-lg', label: 'text-sm' },
    lg: { sale: 'text-3xl', reg: 'text-xl', label: 'text-sm' },
  }[size];

  return (
    <div className={['flex flex-col gap-0.5', className].join(' ')}>
      {hasSale ? (
        <>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className={`font-bold text-macys-red ${sizeClasses.sale}`}>
              {fmt(price.sale)}
            </span>
            <span className={`text-macys-gray-light line-through ${sizeClasses.reg}`}>
              {fmt(price.regular)}
            </span>
          </div>
          <p className={`text-macys-red font-semibold ${sizeClasses.label}`}>
            You save {fmt(savings)} ({savingsPercent}% off)
          </p>
        </>
      ) : (
        <span className={`font-bold text-macys-gray ${sizeClasses.sale}`}>
          {fmt(price.regular)}
        </span>
      )}
    </div>
  );
}

PriceDisplay.propTypes = {
  price: PropTypes.shape({
    regular: PropTypes.number.isRequired,
    sale: PropTypes.number,
  }).isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};
