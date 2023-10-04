import { CenturyFilters } from './CenturyFilters';
import { ResetFilters } from './ResetFilters';
import { SearchInput } from './SearchInput';
import { SexFilter } from './SexFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexFilter />
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
      </p>
      <SearchInput />

      <CenturyFilters />

      <ResetFilters />
    </nav>
  );
};
