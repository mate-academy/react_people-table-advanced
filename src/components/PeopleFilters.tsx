import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  function getCenturiesSearch(c: string) {
    const newArr = centuries.includes(c)
      ? centuries.filter(v => v !== c)
      : [...centuries, c];

    return newArr;
  }

  function handleSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleSearchValue}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(v => (
              <SearchLink
                key={v}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(v),
                })}
                params={{ centuries: getCenturiesSearch(v) }}
              >
                {v}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
