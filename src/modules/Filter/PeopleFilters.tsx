import { SearchLink } from '../Shared/SearchLink';
import { SexFilter, InputSearch, CenturyFilter } from './components';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <InputSearch />

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
