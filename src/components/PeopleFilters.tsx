import { SearchLink } from './SearchLink';
import { SexFilter } from './filters/SexFilter';
import { NameFilter } from './filters/NameFilter';
import { CenturyFilter } from './filters/CenturyFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <div className="panel-block">
        <NameFilter />
      </div>

      <div className="panel-block">
        <CenturyFilter />
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
