import { Link, useSearchParams } from 'react-router-dom';
import { SexFilter } from './SexFilter';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();

  const resetSearchString = getSearchWith(searchParams, {
    sex: null,
    query: null,
    centuries: null,
    sort: null,
    order: null,
  });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter />
      <NameFilter />
      <CenturyFilter />
      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            pathname: '/people',
            search: resetSearchString,
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
