import { FilterByCenturies } from './FilterByCenturies';
import { FilterByNames } from './FilterByNames';
import { FilterBySex } from './FilterBySex';
import { ResetAllFilters } from './ResetAllFilters';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterBySex />

      <FilterByNames />

      <FilterByCenturies />

      <ResetAllFilters />
    </nav>
  );
};
