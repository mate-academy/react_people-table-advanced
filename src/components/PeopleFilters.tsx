import { CenturyFilter } from './CenturyFilter';
import { QueryFilter } from './QueryFilter';
import { SearchLink } from './SearchLink';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <SexFilter />

    <QueryFilter />

    <CenturyFilter />

    <div className="panel-block">
      <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={{
          sex: null,
          query: null,
          centuries: [],
        }}
      >
        Reset all filters
      </SearchLink>
    </div>
  </nav>
);
