import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { ResetFilters } from './ResetFilters';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter />
      <NameFilter />
      <CenturyFilter />
      <ResetFilters />
    </nav>
  );
};
