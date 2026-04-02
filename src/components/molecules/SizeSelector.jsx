import PropTypes from 'prop-types';

export function SizeSelector({ sizes, outOfStockSizes = [], selected, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-macys-gray">
          Size: {selected && <span className="font-normal">{selected}</span>}
        </span>
        <button
          type="button"
          className="text-xs text-macys-red underline hover:no-underline focus:outline-none"
          onClick={() => {/* Size chart modal could open here */}}
        >
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select a size">
        {sizes.map((size) => {
          const oos = outOfStockSizes.includes(size);
          const isSelected = selected === size;
          return (
            <button
              key={size}
              type="button"
              disabled={oos}
              aria-pressed={isSelected}
              aria-label={`Size ${size}${oos ? ' - Out of stock' : ''}`}
              onClick={() => !oos && onChange(size)}
              className={[
                'size-btn',
                isSelected ? 'active' : '',
                oos ? 'out-of-stock' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {size}
            </button>
          );
        })}
      </div>
      {outOfStockSizes.length > 0 && (
        <p className="text-xs text-macys-gray-light mt-2">
          Strikethrough sizes are currently out of stock.
        </p>
      )}
    </div>
  );
}

SizeSelector.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  outOfStockSizes: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
