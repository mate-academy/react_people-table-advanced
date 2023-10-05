import { CenturyFilters } from './CenturyFilters';
import { ResetFilters } from './ResetFilters';
import { SearchInput } from './SearchInput';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter />
      <SearchInput />
      <CenturyFilters />
      <ResetFilters />
    </nav>
  );
};
