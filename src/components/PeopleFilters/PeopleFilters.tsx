import { SexFilter } from '../SexFilter/SexFilter';
import { FilterBySearch } from '../FilterBySearch/FilterBySearch';
import { CenturiesFilter } from '../CenturiesFilter/CenturiesFilter';
import { ResetFilters } from '../ResetFilters/ResetFilters';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">
        Filters
      </p>

      <SexFilter />

      <FilterBySearch />

      <CenturiesFilter />

      <ResetFilters />
    </nav>
  );
};
