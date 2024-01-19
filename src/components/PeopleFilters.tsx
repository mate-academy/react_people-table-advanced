import { SexFilter } from './SexFilter';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <SexFilter />

    <NameFilter />

    <CenturyFilter />

    <div className="panel-block">
      <SearchLink
        params={{ sex: null, centuries: null, query: null }}
        className="button is-link is-outlined is-fullwidth"
      >
        Reset all filters
      </SearchLink>
    </div>
  </nav>
);
