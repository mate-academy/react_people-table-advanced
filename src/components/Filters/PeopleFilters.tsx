import { SearchFilter } from './SearchFilter';
import { GenderFilter } from './GenderFilter';
import { CenturyFilter } from './CenturyFilter';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <GenderFilter />
      <SearchFilter />

      <CenturyFilter />

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
