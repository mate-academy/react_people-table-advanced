import { useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centuriesPoints = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, {
      query: e.target.value || null,
    }));
  };

  const toggleCentury = (age: string) => {
    return centuries.includes(age)
      ? centuries.filter(century => century !== age)
      : [...centuries, age];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            { 'is-active': !sex },
          )}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames(
            { 'is-active': sex === 'm' },
          )}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames(
            { 'is-active': sex === 'f' },
          )}
          params={{
            sex: 'f',
          }}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesPoints.map(age => (
              <SearchLink
                key={age}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(age) },
                )}
                params={{ centuries: toggleCentury(age) }}
              >
                {age}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button', 'is-success',
                { 'is-outlined': !!centuries.length },
              )}
              params={{
                centuries: null,
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
          params={{
            sex: null,
            centuries: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
