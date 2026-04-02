import PropTypes from 'prop-types';
import { Check } from 'lucide-react';

export function ColorSelector({ colors, selected, onChange }) {
  const selectedColor = colors.find((c) => c.name === selected);

  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-macys-gray">
        Color:{' '}
        {selectedColor && (
          <span className="font-normal">{selectedColor.name}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select a color">
        {colors.map((color) => {
          const isSelected = selected === color.name;
          // Determine if this is a light color that needs a dark border
          const isLight = isLightColor(color.hex);

          return (
            <button
              key={color.name}
              type="button"
              aria-label={color.name}
              aria-pressed={isSelected}
              title={color.name}
              onClick={() => onChange(color.name)}
              className={[
                'swatch-btn',
                isSelected ? 'active ring-2 ring-offset-1 ring-macys-gray' : '',
                isLight ? 'border border-macys-gray-border' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <Check
                  size={12}
                  className={isLight ? 'text-macys-gray' : 'text-white'}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Heuristic: treat very light hex colors as "light" so we add a visible border.
 */
function isLightColor(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.75;
}

ColorSelector.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      hex: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
