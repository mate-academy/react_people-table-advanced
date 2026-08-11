import React from 'react';
import { SearchLink } from '../SearchLink';

export const ResetFilterButton: React.FC = () => {
  return (
    <div className="panel-block">
      <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={{ sex: null, query: null, centuries: [] }}
      >
        Reset all filters
      </SearchLink>
    </div>
  );
};
