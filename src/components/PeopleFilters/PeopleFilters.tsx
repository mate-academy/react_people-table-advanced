import { NameFilter } from './NameFilter/NameFilter';
import { CenturyFilter } from './CenturyFilter/CenturyFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs">
        <span>Search</span>
      </p>

      <NameFilter />

      <p className="panel-tabs">
        <span>Centuries</span>
      </p>

      <CenturyFilter />
    </nav>
  );
};
