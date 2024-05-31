import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSex = searchParams.get('sex') ?? '';
  const currentCenturies = searchParams.getAll('centuries') ?? [];

  const handleQueryChange = (queryValue: string) => {
    setQuery(queryValue);

    if (queryValue === '') {
      setSearchParams(getSearchWith(searchParams, { query: null }));
    } else {
      setSearchParams(getSearchWith(searchParams, { query: queryValue }));
    }
  };

  const handleToggleCentury = (century: string): string[] => {
    return currentCenturies.includes(century)
      ? currentCenturies.filter(value => value !== century)
      : [...currentCenturies, century];
  };

  const handleReset = () => {
    setQuery('');
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': currentSex === '',
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': currentSex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': currentSex === 'f',
          })}
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
            value={query}
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': currentCenturies.includes(century),
                })}
                params={{ centuries: handleToggleCentury(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': currentCenturies.length,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleReset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
