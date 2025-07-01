import { useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters: React.FC = () => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleQueryChange = (qw: string) => {
    setQuery(qw);
    setSearchParams(getSearchWith(searchParams, { query: qw || null }));
  };

  const paramsList = (key: string, value: string) => {
    const currentList = searchParams.getAll(key);

    return currentList.includes(value)
      ? currentList.filter(v => v !== value)
      : [...currentList, value];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={classNames({
            'is-active': searchParams.get('sex') === null,
          })}
          end
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </NavLink>
        <NavLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          end
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </NavLink>
        <NavLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          end
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => handleQueryChange(e.target.value)}
          />

          <span className="icon is-left" onClick={() => handleQueryChange('')}>
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <NavLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('16'),
              })}
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, {
                  centuries: paramsList('centuries', '16'),
                }),
              }}
            >
              16
            </NavLink>

            <NavLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('17'),
              })}
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, {
                  centuries: paramsList('centuries', '17'),
                }),
              }}
            >
              17
            </NavLink>

            <NavLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('18'),
              })}
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, {
                  centuries: paramsList('centuries', '18'),
                }),
              }}
            >
              18
            </NavLink>

            <NavLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('19'),
              })}
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, {
                  centuries: paramsList('centuries', '19'),
                }),
              }}
            >
              19
            </NavLink>

            <NavLink
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('20'),
              })}
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, {
                  centuries: paramsList('centuries', '20'),
                }),
              }}
            >
              20
            </NavLink>
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.get('centuries') !== null,
              })}
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, { centuries: null }),
              }}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, {
              centuries: null,
              sex: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
