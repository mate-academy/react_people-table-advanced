import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchLink } from './SearchLink';
import { FilterBySex, FilterByCentury } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { toggleCentury } from '../utils/functions';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || 'All';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = getSearchWith(searchParams, {
      query: event.target.value,
    });

    setSearchParams(newParams);
  };

  const filterBySexOptions = Object.entries(FilterBySex);
  const filterByCenturyOptions = Object.values(FilterByCentury);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {filterBySexOptions.map(([filterLabel, filterValue]) => (
          <SearchLink
            params={{ sex: filterValue === 'All' ? null : filterValue }}
            className={classNames({ 'is-active': sex === filterValue })}
            key={filterValue}
          >
            {filterLabel}
          </SearchLink>
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
            onChange={handleSearchChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {filterByCenturyOptions.map(century => (
              <SearchLink
                params={{ centuries: toggleCentury(century, centuries) }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                { 'is-outlined': centuries.length !== 0 },
                { 'is-success': centuries.length === 0 },
              )}
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
          params={{ query: null, centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
