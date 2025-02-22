import { GenderFilter } from './filters/GenderFilter';
import { SearchFilter } from './filters/SearchFilter';
import { CenturiesFilter } from './filters/CenturiesFilter';
import { ResetAllFilters } from './filters/ResetAllFilters';

export function getArraySearchParams(searchParams: string[], newValue: string) {
  return searchParams.includes(newValue)
    ? searchParams.filter(param => param !== newValue)
    : [...searchParams, newValue];
}

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <GenderFilter />

      <SearchFilter />

      <CenturiesFilter />

      <ResetAllFilters />
    </nav>
  );
};
