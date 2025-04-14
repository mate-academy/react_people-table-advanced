import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../SearchLink';

import {
  allCenturies,
  DEFAULT_QUERY_VALUE,
  FILTER_PARAMS,
  sexOptions,
} from '../../constants/filterConstants';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll(FILTER_PARAMS.CENTURIES.KEY);

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      const value = event.target.value || null;

      if (value) {
        newParams.set(FILTER_PARAMS.QUERY.KEY, value);
      } else {
        newParams.delete(FILTER_PARAMS.QUERY.KEY);
      }

      return newParams;
    });
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexOptions.map(({ label, value }) => (
          <SearchLink
            key={value ?? 'all'}
            params={{ [FILTER_PARAMS.SEX.KEY]: value }}
            className={cn(
              searchParams.get(FILTER_PARAMS.SEX.KEY) === value && 'is-active',
            )}
          >
            {label}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={
              searchParams.get(FILTER_PARAMS.QUERY.KEY) || DEFAULT_QUERY_VALUE
            }
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleNameFilterChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(century => (
              <SearchLink
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': selectedCenturies.includes(String(century)),
                })}
                key={century}
                params={{
                  [FILTER_PARAMS.CENTURIES.KEY]: selectedCenturies.includes(
                    String(century),
                  )
                    ? selectedCenturies.filter(val => val !== String(century))
                    : [...selectedCenturies, String(century)],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ [FILTER_PARAMS.CENTURIES.KEY]: [] }}
              data-cy="centuryALL"
              className={cn(
                'button',
                { 'is-outlined': selectedCenturies.length > 0 },
                'is-success',
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
