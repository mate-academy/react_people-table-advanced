import { CenturyFilter } from './CenturyFilter';
import { SearchLink } from './SearchLink';
import { SerchFilter } from './SerchFilter';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <SerchFilter />
      <CenturyFilter />

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: [],
            sex: '',
            query: '',
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
