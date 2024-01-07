import { SexFilter } from './SexFilter/SexFilter';
import { QueryFilter } from './QueryFilter/QueryFilter';
import { CenturyFilter } from './CenturyFilter/CenturyFilter';
import { SearchLink } from '../SearchLink/SearchLink';

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
            century: [],
            sex: null,
            search: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
