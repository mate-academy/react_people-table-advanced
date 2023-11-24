import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || null;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            search: getSearchWith(
              searchParams, { sex: null },
            ),
          }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </Link>
        <Link
          to={{
            search: getSearchWith(
              searchParams, { sex: 'm' },
            ),
          }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>
        <Link
          to={{
            search: getSearchWith(
              searchParams, { sex: 'f' },
            ),
          }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            onChange={event => setSearchParams(
              getSearchWith(searchParams, {
                query: event.target.value || null,
              }),
            )}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {'16,17,18,19,20'.split(',').map(century => (
              <Link
                key={century}
                to={{
                  search: getSearchWith(
                    searchParams, {
                      centuries: centuries.includes(century)
                        ? centuries.filter(ch => century !== ch)
                        : [...centuries, century],
                    },
                  ),
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to={{
                search: getSearchWith(
                  searchParams, {
                    centuries: null,
                  },
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
              searchParams, {
                sex: null, query: null, centuries: null,
              },
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
