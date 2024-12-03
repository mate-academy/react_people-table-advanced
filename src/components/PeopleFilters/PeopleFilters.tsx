import { SearchLink } from '../SearchLink/SearchLink';
import { FilterBySex } from '../FilterBySex/FilterBySex';
import { FilterByName } from '../FilterByName/FilterByName';
import { FilterByCentury } from '../FilterByCentury/FilterByCentury';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterBySex />

      <FilterByName />

      <FilterByCentury />

      <div className="panel-block">
        <SearchLink
          params={{ centuries: null, sex: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
