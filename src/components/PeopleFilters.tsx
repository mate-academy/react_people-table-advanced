import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import React, { useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value) {
      setSearchParams(getSearchWith(searchParams, { query: e.target.value }));
    } else {
      setSearchParams(getSearchWith(searchParams, { query: null }));
    }
  };

  function getCenturiesParams(century: string) {
    const centuries = searchParams.getAll('centuries');

    if (centuries.includes(century)) {
      return centuries.filter(c => c !== century);
    }

    return [...centuries, century];
  }

  const resetFilter = () =>
    getSearchWith(searchParams, {
      query: null,
      centuries: [],
      sex: null,
    });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !searchParams.get('sex'),
          })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
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
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('16'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: getCenturiesParams('16'),
                }),
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('17'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: getCenturiesParams('17'),
                }),
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('18'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: getCenturiesParams('18'),
                }),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('19'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: getCenturiesParams('19'),
                }),
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': searchParams.getAll('centuries').includes('20'),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: getCenturiesParams('20'),
                }),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-outlined', {
                'is-success': searchParams.getAll('centuries').length === 5,
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries:
                    searchParams.getAll('centuries').length === 5
                      ? []
                      : ['16', '17', '18', '19', '20'],
                }),
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
          to={{ pathname: '/people', search: resetFilter() }}
          onClick={() => setQuery('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
