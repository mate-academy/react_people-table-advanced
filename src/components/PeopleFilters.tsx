import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const allCenturies = [];

  for (let i = 16; i <= 20; i += 1) {
    allCenturies.push(i.toString());
  }

  const handleQuetyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const getCenturiesParams = (ch: string) => {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(item => item !== ch)
      : [...centuries, ch];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': sex === '' })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            onChange={handleQuetyChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCenturies.map(item => (
              <SearchLink
                key={item}
                params={{ centuries: getCenturiesParams(item) }}
                className={
                  classNames(
                    'button mr-1',
                    { 'is-info': centuries.includes(item) },
                  )
                }
              >
                {item}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={
                classNames(
                  'button is-success',
                  { 'is-outlined': !!centuries.length },
                )
              }
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ centuries: null, query: null, sex: null }}
          className={
            classNames(
              'button is-link is-fullwidth',
              { 'is-outlined': !centuries.length },
            )
          }
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
