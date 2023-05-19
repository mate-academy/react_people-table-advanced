import classNames from 'classnames';
import React, { FC } from 'react';
import { Link as SearchLink, URLSearchParamsInit } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  searchParams: URLSearchParams
  setSearchParams: (params: URLSearchParamsInit) => void;
}

export const PeopleFilters: FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={
            classNames({ 'is-active': !sex })
          }
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
            }),
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={
            classNames({ 'is-active': sex === 'm' })
          }
          to={{
            search: getSearchWith(searchParams, {
              sex: 'm',
            }),
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={
            classNames({ 'is-active': sex === 'f' })
          }
          to={{
            search: getSearchWith(searchParams, {
              sex: 'f',
            }),
          }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            onChange={onQueryChange}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={
                  classNames('button mr-1',
                    { 'is-info': centuries.includes(century) })
                }
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': centuries.length })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: null,
                }),
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              centuries: null,
              query: null,
              sex: null,
            }),
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
