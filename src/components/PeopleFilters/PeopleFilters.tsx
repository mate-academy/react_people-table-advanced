import { SexFilter } from './SexFilter';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';
import { ResetFilter } from './ResetFilter';

export const PeopleFilters: React.FC = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <NameFilter />

      <CenturyFilter />

      <ResetFilter />
    </nav>
  );
};
