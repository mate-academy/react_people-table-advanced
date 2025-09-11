// #region Imports

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { sexOptions } from '../constants/sexOptions';
import { centuriesOptions } from '../constants/centuriesOptions';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParams } from '../types/SearchParams';

// #endregion

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();

    setSearchWith({ query: value || null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexOptions.map(option => (
          <Link
            key={option.label}
            className={cn({
              'is-active':
                sex === option.value || (!sex && option.value === null),
            })}
            to={{ search: getSearchWith({ sex: option.value }, searchParams) }}
          >
            {option.label}
          </Link>
        ))}
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
        <div
          className="
          level
          is-flex-grow-1
          is-mobile
          "
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {centuriesOptions.map(century => {
              const isActive = centuries.includes(century);

              const linkSearch = {
                search: getSearchWith(
                  {
                    centuries: isActive
                      ? centuries.filter(ch => ch !== century)
                      : [...centuries, century],
                  },
                  searchParams,
                ),
              };

              return (
                <Link
                  key={century}
                  data-cy="century"
                  to={linkSearch}
                  className={cn('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{ search: getSearchWith({ centuries: null }, searchParams) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="
          button
          is-link
          is-outlined
          is-fullwidth
          "
          to={{
            search: getSearchWith(
              { query: null, sex: null, centuries: null },
              searchParams,
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
