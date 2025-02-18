import classNames from 'classnames';
import React, { useCallback } from 'react';
import { SearchLink } from '../SearchLink/SearchLink';
import { usePeopleFilters } from '../../hooks/usePeopleFilters';

const SEX_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
];
const CENTURY_FILTERS = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const { query, sex, centuries, updateFilters } = usePeopleFilters();

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateFilters({ query: event.target.value || null });
    },
    [updateFilters],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTERS.map(({ label, value }) => (
          <SearchLink
            key={label}
            params={{ sex: value || null }}
            className={classNames({ 'is-active': sex === value })}
          >
            {label}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            value={query}
            placeholder="Search"
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
            {CENTURY_FILTERS.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(centuryElem => centuryElem !== century)
                    : [...centuries, century],
                }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.some(century =>
                  CENTURY_FILTERS.includes(century),
                ),
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
