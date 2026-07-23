import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSex = searchParams.get('sex') || '';
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSearch = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(newSearch);
  };

  const getCenturyParams = (century: string) => {
    if (currentCenturies.includes(century)) {
      return currentCenturies.filter(c => c !== century);
    }

    return [...currentCenturies, century];
  };

  const isAllCenturiesSelected = CENTURIES.every(c =>
    currentCenturies.includes(c),
  );

  return (
    <nav className="panel" data-cy="PeopleFilters">
      <p className="panel-heading">Filters</p>

      {/* SexFilter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !currentSex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': currentSex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': currentSex === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      {/* NameFilter */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={currentQuery}
            onChange={handleQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {/* CenturyFilter */}
      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{ centuries: getCenturyParams(century) }}
                className={classNames('button mr-1', {
                  'is-info': currentCenturies.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{
                centuries: isAllCenturiesSelected ? [] : CENTURIES,
              }}
              className={classNames('button is-success', {
                'is-outlined': !isAllCenturiesSelected,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* Reset all filters */}
      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
            centuries: [],
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
