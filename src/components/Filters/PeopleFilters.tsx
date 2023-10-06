import React from 'react';
import { CenturyFilter } from './CenturyFilter';
import { GenderFilter } from './GenderFilter';
import { SearchLink } from '../SearchLink';
import { SearchFilter } from './SearchFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <GenderFilter />

      <SearchFilter />

      <div className="panel-block">
        <CenturyFilter />
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null, centuries: null, query: null, sort: null, order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
