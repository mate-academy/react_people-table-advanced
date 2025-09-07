/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useSearchParams } from 'react-router-dom';
import { CenturyFilter } from './CenturyFilter';
import { NameFilter } from './NameFilter';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function handleCenturies(cn: string) {
    const newCenturies = centuries.includes(cn)
      ? centuries.filter(century => century !== cn)
      : [...centuries, cn];

    setSearchWith({ centuries: newCenturies });
  }

  function clearCenturies() {
    setSearchWith({ centuries: null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
        >
          Female
        </Link>
      </p>

      <NameFilter query={query} handleQueryChange={handleQueryChange} />

      <CenturyFilter
        handleCenturies={handleCenturies}
        clearCenturies={clearCenturies}
      />

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, {
              query: null,
              sex: null,
              centuries: [],
              sort: sort,
              order: order === 'asc' ? null : order,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
