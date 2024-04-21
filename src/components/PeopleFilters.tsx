import { SexFilter } from './PeopleFilters/SexFilter';
import { QueryFilter } from './PeopleFilters/QueryFilter';
import { CenturiesFilter } from './PeopleFilters/CenturiesFilter';
import { ResetFilters } from './PeopleFilters/ResetFilters';

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
