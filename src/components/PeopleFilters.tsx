import { FC } from 'react';
import { SexFilter } from './SexFilter';
import { SearchLink } from './SearchLink';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';

export const PeopleFilters: FC = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter />

      <div className="panel-block" />
      <NameFilter />

      <div className="panel-block">
        <CenturyFilter />
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
