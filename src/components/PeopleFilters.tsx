import { Link, useSearchParams } from 'react-router-dom';
import { CenturyFilter } from './CenturyFilter/CenturyFilter';
import { NameFilter } from './NameFilter';
import { SexFilter } from './sexFilter';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter sex={sex} />

      <NameFilter />

      <CenturyFilter />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ pathname: '/people' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
