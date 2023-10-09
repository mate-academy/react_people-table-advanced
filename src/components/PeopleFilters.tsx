import classNames from 'classnames';
import {
  Link, useLocation, useSearchParams,
} from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const isActiveCentury = (century: string) => centuries.includes(century);

  const isActive = (newSex: string) => {
    if (newSex === '') {
      return !location.search || !location.search.includes('sex');
    }

    return location.search.includes(`sex=${newSex}`);
  };

  function toggleCenturies(century: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(century)
      ? centuries.filter(centur => centur !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(centur => params.append('centuries', centur));

    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const paramsToUpdate = { query: event.target.value || null };
    const newSearchParams = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(newSearchParams);
  }

  function handleSexChange(newSex: string) {
    const paramsToUpdate = { sex: newSex || null };
    const newSearchParams = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(newSearchParams);
  }

  function clearCenturies() {
    const paramsToUpdate = { centuries: [] };
    const newSearchParams = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(newSearchParams);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames(
            { 'is-active': sex === '' },
          )}
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: null }),
          }}
          onClick={() => handleSexChange('')}
        >
          All
        </Link>
        <Link
          className={classNames(
            { 'is-active': isActive('m') },
          )}
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
          onClick={() => handleSexChange('m')}
        >
          Male
        </Link>
        <Link
          className={classNames(
            { 'is-active': isActive('f') },
          )}
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
          onClick={() => handleSexChange('f')}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': isActiveCentury(century.toString()),
                })}
                to={{
                  pathname: '/people',
                  search: getSearchWith(searchParams, {
                    centuries: isActiveCentury(century.toString())
                      ? centuries.filter(c => c !== century.toString())
                      : [...centuries, century.toString()],
                  }),
                }}
                onClick={() => toggleCenturies(century.toString())}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname: '/people',
                search: getSearchWith(searchParams, { centuries: [] }),
              }}
              onClick={() => clearCenturies()}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
