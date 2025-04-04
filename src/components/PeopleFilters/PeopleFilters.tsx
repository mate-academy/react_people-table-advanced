import { GenderFilter } from './components/GenderFilter';
import { SearchFilter } from './components/SearchFilter';
import { CenturyFilter } from './components/CenturyFilter';
import { ResetFilters } from './components/ResetFilters';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <GenderFilter />
      <SearchFilter />
      <CenturyFilter />
      <ResetFilters />
    </nav>
  );
};
