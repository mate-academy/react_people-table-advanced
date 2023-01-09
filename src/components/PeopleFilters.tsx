import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams | string) => void,
  filterBySex: string | null,
  filterQuery: string | null,
  centuries: string[],
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  filterBySex,
  filterQuery,
  centuries,
}) => {
  const setSearch = (param: string, value: string | string[] | null) => {
    return getSearchWith(searchParams, { [param]: value });
  };

  const setQuery = (query: string) => {
    setSearchParams(getSearchWith(searchParams, { query: query || null }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': filterBySex === null })}
          to={{ search: setSearch('sex', null) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': filterBySex === 'm' })}
          to={{ search: setSearch('sex', 'm') }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': filterBySex === 'f' })}
          to={{ search: setSearch('sex', 'f') }}
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
            value={filterQuery || ''}
            onChange={(event) => setQuery(event.target.value)}
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
                'is-info': centuries.includes('16'),
              })}
              to={{
                search: setSearch('centuries', centuries.includes('16')
                  ? centuries.filter(c => c !== '16')
                  : [...centuries, '16']),
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              to={{
                search: setSearch('centuries', centuries.includes('17')
                  ? centuries.filter(c => c !== '17')
                  : [...centuries, '17']),
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              to={{
                search: setSearch('centuries', centuries.includes('18')
                  ? centuries.filter(c => c !== '18')
                  : [...centuries, '18']),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              to={{
                search: setSearch('centuries', centuries.includes('19')
                  ? centuries.filter(c => c !== '19')
                  : [...centuries, '19']),
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              to={{
                search: setSearch('centuries', centuries.includes('20')
                  ? centuries.filter(c => c !== '20')
                  : [...centuries, '20']),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
              to={{ search: setSearch('centuries', null) }}
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
            search: getSearchWith(searchParams, {
              sort: null,
              order: null,
              sex: null,
              query: null,
              centuries: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
