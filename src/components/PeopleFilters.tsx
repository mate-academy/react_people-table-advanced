import { SexFilter } from './Filters/SexFilter';
import { QueryFilter } from './Filters/QueryFilter';
import { CenturiesFilter } from './Filters/CenturiesFilter';
import { ResetFilters } from './Filters/ResetFilters';

export function createArrayOfSearchParams(
  searchParams: string[],
  newSearchValue: string,
) {
  return searchParams.includes(newSearchValue)
    ? searchParams.filter(searchParam => searchParam !== newSearchValue)
    : [...searchParams, newSearchValue];
}

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <QueryFilter />

      <CenturiesFilter />

      <ResetFilters />
    </nav>
  );
};
