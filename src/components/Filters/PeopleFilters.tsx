import CenturiesFilter from './CenturiesFilter';
import QueryFilter from './QueryFilter';
import ResetFilter from './ResetFilter';
import SexFilter from './SexFilter';

const PeopleFilters = () => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <SexFilter />
    <QueryFilter />
    <CenturiesFilter />
    <ResetFilter />
  </nav>
);

export default PeopleFilters;
