import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { FilterParams } from '../types/FilterParams';
import { CENTURIES } from '../utils/centuries';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFilter = searchParams.get(FilterParams.Query) || '';
  const sexFilter = searchParams.get(FilterParams.Sex) || '';
  const selectedCenturies = searchParams.getAll(FilterParams.Centuries) || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSearchParams = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(updatedSearchParams);
  };

  const handleCenturyChange = (currentCentury: string) => {
    return selectedCenturies.includes(currentCentury)
      ? selectedCenturies.filter((century) => century !== currentCentury)
      : [...selectedCenturies, currentCentury];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sexFilter })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sexFilter === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sexFilter === 'f' })}
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
            value={queryFilter}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': selectedCenturies.includes(century),
                })}
                params={{ centuries: handleCenturyChange(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!selectedCenturies.length,
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
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': !!selectedCenturies.length
              || sexFilter
              || queryFilter,
          })}
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};

export default PeopleFilters;
