import { Link } from 'react-router-dom';
import { SexFilter } from './components/SexFiltering/SexFiltering';
import { QueryFiltering } from './components/QueryFiltering/QueryFIltering';
// eslint-disable-next-line max-len
import { CenturiesFilltering } from './components/CenturiesFiltering/CenturiesFilltering';

export const PeopleFilters = () => {
  return (
    <nav className="panel" style={{ height: 'min-content' }}>
      <p className="panel-heading">Filters</p>

      <SexFilter />
      <QueryFiltering />
      <CenturiesFilltering />

      <div className="panel-block">
        <Link
          to="/people"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
