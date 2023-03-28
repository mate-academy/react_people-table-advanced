import { CenturiesFilter } from './CenturiesFilter';
import { NameFilter } from './NameFilter';
import { SearchLink } from './SearchLink';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <NameFilter />

      <CenturiesFilter />

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            sex: null,
            query: null,
            order: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
