import { CenturyFilter } from './CenturyFilter';
import { QueryFilter } from './PeopleTable/QueryFilter';
import { SearchLink } from './SearchLink';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  return (
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
};
