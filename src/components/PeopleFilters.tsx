import { SearchLink } from './SearchLink';
import { SexFilter } from './Filters/SexFilter';
import { NameFilter } from './Filters/NameFilter';
import { CenturyFilter } from './Filters/CenturyFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <NameFilter />
      <CenturyFilter />

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
