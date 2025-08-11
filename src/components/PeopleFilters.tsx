import { NameFilter } from './NameFilter';
import { SexFilter } from './SexFilter';
import { CenturyFilter } from './CenturyFilter';
import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleReset() {
    const params = searchParams;

    params.delete('name');
    params.delete('sex');
    params.delete('centuries');

    setSearchParams(searchParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <NameFilter />

      <CenturyFilter />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={handleReset}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
