import { CenturySearch } from './FilterParams/CenturySearch';
import { InputSearch } from './FilterParams/InputSearch';
import { SexFilter } from './FilterParams/SexFilter';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <InputSearch />

      <CenturySearch />

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
