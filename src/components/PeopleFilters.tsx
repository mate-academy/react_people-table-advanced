import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const sexParams = {
    All: null,
    Male: 'm',
    Female: 'f',
  };

  const centuriesParams = ['16', '17', '18', '19', '20'];

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));
  };

  const conditionForParamsCentury = (value: string) => {
    return centuries.includes(value)
      ? centuries.filter(number => number !== value)
      : [...centuries, value];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(sexParams).map(([key, value]) => (
          <SearchLink
            key={value}
            params={{ sex: value }}
            className={classNames(
              { 'is-active': sex === value },
            )}
          >
            {key}
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
            onChange={onInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesParams.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                params={{ centuries: conditionForParamsCentury(century) }}
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length },
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
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
