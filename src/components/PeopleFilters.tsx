import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types';

const CENTURIES: number[] = [16, 17, 18, 19, 20];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');

  const getNewCenturies = (century: string) => {
    return selectedCenturies.includes(century)
      ? selectedCenturies.filter(currentCentury => currentCentury !== century)
      : [...selectedCenturies, century];
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = e.target.value.trim().toLowerCase();
    const newParams = getSearchWith(
      searchParams,
      { query: normalizedQuery || null },
    );

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !searchParams.get('sex') })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.male }}
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.female }}
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={searchParams.get('query') || ''}
            type="search"
            className="input"
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
            {CENTURIES.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1',
                  { 'is-info': selectedCenturies.includes(`${century}`) })}
                params={{ centuries: getNewCenturies(`${century}`) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success',
                { 'is-outlined': !!selectedCenturies.length })}
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
            centuries: [],
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
