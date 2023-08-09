import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const centuriesArr = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames(
            { 'is-active': sex === 'm' },
          )}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames(
            { 'is-active': sex === 'f' },
          )}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
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
            onChange={event => {
              setSearchParams(getSearchWith(
                searchParams, { query: event.target.value || null },
              ));
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArr.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  {
                    'is-info': searchParams.getAll('centuries')
                      .includes(century),
                  },
                )}
                to={{
                  search: getSearchWith(
                    searchParams,
                    {
                      centuries: centuries.includes(century)
                        ? centuries.filter(x => x !== century)
                        : [...centuries, century],
                    },
                  ),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': searchParams.get('centuries') !== null },
              )}
              to={{
                search: getSearchWith(
                  searchParams, { centuries: null },
                ),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              searchParams,
              { sex: null, query: null, centuries: null },
            ),
          }}
          onClick={() => {
            setSearchParams('');
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
