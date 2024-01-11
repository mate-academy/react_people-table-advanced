import { SearchLink } from '../SearchLink';
import { CenturyFilter, NameFilter, SexFilter } from './FilterParts';

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
          params={
            { sex: null, query: null, centuries: null }
          }
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
