import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-macys-gray-mid">
      <ol className="flex items-center flex-wrap gap-1">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1">
              {!isLast ? (
                <>
                  <Link
                    to={crumb.href}
                    className="hover:text-macys-red hover:underline transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight size={12} className="text-macys-gray-border" aria-hidden />
                </>
              ) : (
                <span className="text-macys-gray font-medium" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
};
