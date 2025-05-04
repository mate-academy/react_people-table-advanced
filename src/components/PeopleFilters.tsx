import React, { FC } from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

enum FilterGander {
  all = 'all',
  m = 'm',
  f = 'f',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuriesNumbers = [16, 17, 18, 19, 20];

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  const handleResetFilters = () => {
    const order = searchParams.get('order') || '';
    const sort = searchParams.get('sort') || '';

    setSearchParams({});
    setSearchParams({ sort });
    getSearchWith(searchParams, { order });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': sex === '' })}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === FilterGander.m })}
          to={{ search: getSearchWith(searchParams, { sex: FilterGander.m }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === FilterGander.f })}
          to={{ search: getSearchWith(searchParams, { sex: FilterGander.f }) }}
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
            name="query"
            value={query}
            onChange={handleFilterChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesNumbers.map(century => (
              <NavLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(`${century}`)
                      ? centuries.filter(item => item !== `${century}`)
                      : [...centuries, `${century}`],
                  }),
                }}
              >
                {century}
              </NavLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className={classNames('button is-success ', {
                'is-outlined': centuries.length,
              })}
              to={{ search: getSearchWith(searchParams, { centuries: [] }) }}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <div
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilters}
        >
          Reset all filters
        </div>
      </div>
    </nav>
  );
};
