import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { ResetFilterButton } from './ResetFilterButton';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>
    <SexFilter />
    <NameFilter />
    <CenturyFilter />
    <ResetFilterButton />
  </nav>
);
