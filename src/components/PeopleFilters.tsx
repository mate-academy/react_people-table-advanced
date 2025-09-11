import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

enum Sex {
  Male = 'm',
  Female = 'f',
}

enum Century {
  Sixteenth = '16',
  Seventeenth = '17',
  Eighteenth = '18',
  Nineteenth = '19',
  Twentieth = '20',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const sexParam = searchParams.get('sex');
  const centuriesParam = searchParams.getAll('centuries');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    const nextSearchParams = getSearchWith(
      searchParams,
      {
        query: value || null,
      },
    );

    setSearchParams(nextSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sexParam })}
        >
          All
        </SearchLink>
        {Object.entries(Sex).map(([key, value]) => (
          <SearchLink
            key={value}
            params={{ sex: value }}
            className={classNames({ 'is-active': sexParam === value })}
          >
            {key === 'Male' ? 'Male' : 'Female'}
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
            {Object.values(Century).map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesParam.includes(century),
                })}
                params={{
                  centuries: centuriesParam.includes(century)
                    ? centuriesParam.filter(c => c !== century)
                    : [...centuriesParam, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesParam.length > 0,
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
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
