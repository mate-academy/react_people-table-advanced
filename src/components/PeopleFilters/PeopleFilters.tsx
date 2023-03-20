import { CenturiesFilter } from '../CenturiesFilter/CenturiesFilter';
import { QueryFilter } from '../QueryFilter/QueryFilter';
import { ResetFilters } from '../ResetFilters/ResetFilters';
import { SexFilter } from '../SexFilter/SexFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <QueryFilter />
      <CenturiesFilter />
      <ResetFilters />
    </nav>
  );
};
