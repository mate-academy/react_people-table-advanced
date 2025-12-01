import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { SexTypes } from '../types/SexTypes';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
interface Props {
  sexFilterParams: string;
  query: string;
  centuries: string[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const PeopleFilters = ({
  query,
  sexFilterParams,
  centuries,
  searchParams,
  setSearchParams,
}: Props) => {
  const centuriesList: readonly string[] = [`16`, `17`, `18`, `19`, `20`];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchWith({ query: value });
  };

  const hadleCenturies = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(currCen => currCen !== century)
      : [...centuries, century];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexTypes).map(([key, value]) => {
          return (
            <SearchLink
              key={key}
              params={{ sex: value }}
              className={cn({ 'is-active': sexFilterParams === value })}
            >
              {key}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(char => (
              <SearchLink
                key={char}
                params={{ centuries: hadleCenturies(char) }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(char),
                })}
              >
                {char}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
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
          params={{ query: null, centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
