import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter';
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
