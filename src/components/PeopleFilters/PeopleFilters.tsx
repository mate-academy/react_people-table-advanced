import { CenturiesFilter } from '../CenturiesFilter';
import { QueryFilter } from '../QueryFilter/QueryFilter';
import { ResetFilters } from '../ResetFilters';
import { SexFilter } from '../SexFilter';

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
