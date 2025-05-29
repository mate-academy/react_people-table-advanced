import { SearchLink } from '../SearchLink';
import { FilterBySex } from './FilterParams/filterBySex';
import { SearchInput } from './FilterParams/SearchInput';
import { FilterByCenturies } from './FilterParams/filterByCenturies';
import React from 'react';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterBySex />

      <SearchInput />

      <FilterByCenturies />

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
