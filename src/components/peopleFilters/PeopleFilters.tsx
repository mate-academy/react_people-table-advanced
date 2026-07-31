import { Link } from 'react-router-dom';
import { CenturiesFilter } from './CenturiesFilter';
import { SexFilter } from './SexFilter';
import { SearchFilter } from './SearchFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <SearchFilter />
      <CenturiesFilter />

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
