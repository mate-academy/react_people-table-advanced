import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter';
import { CenturyFilter } from './CenturyFilter';
import { Link } from 'react-router-dom';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <NameFilter />
      <CenturyFilter />

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
