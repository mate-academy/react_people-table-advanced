import { FC } from 'react';
import { CenturyFilter, NameFilter, SexFilter } from './';
import { SearchLink } from '../SearchLink';

export const PeopleFilters: FC = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter />
      <NameFilter />
      <CenturyFilter />

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
