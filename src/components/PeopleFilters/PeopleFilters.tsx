import { Link } from 'react-router-dom';

import { SexFilter } from './SexFilter';
import { SearchInput } from './SearchInput';
import { CenturyFilter } from './CenturyFilter';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <SearchInput />

      <CenturyFilter />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
