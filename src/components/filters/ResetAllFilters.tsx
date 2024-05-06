import React from 'react';
import { Link } from 'react-router-dom';

export const ResetAllFilters: React.FC = () => {
  return (
    <div className="panel-block">
      <Link className="button is-link is-outlined is-fullwidth" to="/people">
        Reset all filters
      </Link>
    </div>
  );
};
