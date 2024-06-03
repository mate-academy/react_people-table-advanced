import { SearchLink } from './SearchLink';
import { CenturyFilter } from './filters/CenturyFilter';
import { SexFilter } from './filters/SexFilter';
import { NameFilter } from './filters/NameFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <NameFilter />
      <CenturyFilter />

      <div className="panel-block">
        <SearchLink
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
          data-cy="centuryALL"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
