import cn from 'classnames';
import { Link } from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';
import { useFilters } from '../hooks/useFilters';

export const PeopleFilters = () => {
  const CENTURIES = [16, 17, 18, 19, 20];
  const { searchParams, setSearchParams, sexInSearch, query, cents } =
    useFilters();

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({
            'is-active': !sexInSearch,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={cn({
            'is-active': sexInSearch === 'm',
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={cn({
            'is-active': sexInSearch === 'f',
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={event =>
              setSearchParams(current =>
                getSearchWith(current, { query: event.target.value || null }),
              )
            }
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <Link
                key={century}
                data-cy="century"
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: cents.includes(century.toString())
                      ? cents.filter(cent => cent !== century.toString())
                      : [...cents, `${century}`],
                  }),
                }}
                className={cn('button mr-1', {
                  'is-info': cents.includes(century.toString()),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': cents.length !== 0,
              })}
              to="."
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
            search: '',
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
