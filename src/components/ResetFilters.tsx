import React from 'react';
import { SearchLink } from './SearchLink';

export const ResetFilters: React.FC = () => (
  <div className="panel-block">
    <SearchLink
      className="button is-link is-outlined is-fullwidth"
      field={{
        sex: null,
        centuries: null,
        query: null,
      }}
    >
      Reset all filters
    </SearchLink>
  </div>
);
