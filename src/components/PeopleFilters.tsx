import { CenturiesFilter } from './Filters/CenturiesFilter';
import { FilterBySex } from './Filters/FilterBySex';
import { SearchFilter } from './Filters/SearchFilter';

export const PeopleFilters = () => {
  return (

    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterBySex />
      <SearchFilter />

      <CenturiesFilter />
    </nav>
  );
};
