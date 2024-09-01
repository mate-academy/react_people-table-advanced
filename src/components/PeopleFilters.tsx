import React from 'react';
import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter';
import { CenturyFilter } from './CenturyFilter';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter />
      <NameFilter />
      <CenturyFilter />

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
