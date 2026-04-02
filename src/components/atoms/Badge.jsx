import PropTypes from 'prop-types';

const PRESETS = {
  sale: 'bg-macys-red text-white',
  new: 'bg-macys-gray text-white',
  popular: 'bg-amber-500 text-white',
  exclusive: 'bg-purple-700 text-white',
  default: 'bg-macys-gray-bg text-macys-gray',
};

function resolveBadgeStyle(label) {
  const l = label.toLowerCase();
  if (l.includes('sale')) return PRESETS.sale;
  if (l.includes('new')) return PRESETS.new;
  if (l.includes('popular') || l.includes('best') || l.includes('favorite')) return PRESETS.popular;
  if (l.includes('exclusive') || l.includes('allure') || l.includes('award')) return PRESETS.exclusive;
  return PRESETS.default;
}

export function Badge({ label, className = '' }) {
  return (
    <span
      className={[
        'inline-block text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm',
        resolveBadgeStyle(label),
        className,
      ].join(' ')}
    >
      {label}
    </span>
  );
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};
