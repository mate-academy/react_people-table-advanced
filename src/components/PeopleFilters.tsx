import { CenturyFilter } from './Filters/CenturyFilter';
import { SexFilter } from './Filters/SexFilter';
import { QueryFilter } from './Filters/QueryFilter';
import { ResetFilter } from './Filters/ResetFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter />
      <QueryFilter />
      <CenturyFilter />
      <ResetFilter />
    </nav>
  );
};
