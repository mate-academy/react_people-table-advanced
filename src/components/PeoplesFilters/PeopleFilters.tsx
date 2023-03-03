import { SexFilter } from '../SexFilter';
import { QueryFilter } from '../QueryFilter';
import { CenturiesFilter } from '../CenturyFilter';
import { ResetFilter } from '../ResetFilter';

export const PeopleFilters: React.FC = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <QueryFilter />
      <CenturiesFilter />
      <ResetFilter />

    </nav>
  );
};
