import { AgeFilter } from './AgeFilter';
import { ResetButton } from './ResetButton';
import { SearchBar } from './SearchBar';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <SearchBar />

      <AgeFilter />
      <ResetButton />
    </nav>
  );
};
