import { Link } from 'react-router-dom';
import { FilterByCenturies } from './FilterByCenturies';
import { FilterBySex } from './FilterBySex';
import { PeopleSearch as PeopleSearchByName } from './PeopleSearch';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterBySex />

      <PeopleSearchByName />

      <FilterByCenturies />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
