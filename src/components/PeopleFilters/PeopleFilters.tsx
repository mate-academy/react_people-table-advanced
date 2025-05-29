import { SexFilter } from './SexFilter';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';
import { ResetFiltersButton } from './ResetFiltersButton';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <NameFilter />
      <CenturyFilter />
      <ResetFiltersButton />
    </nav>
  );
};
