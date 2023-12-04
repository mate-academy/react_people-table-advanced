import React from 'react';
import cn from 'classnames';
import { SetURLSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { Filter } from '../types/Filter';
import { SexPerson } from '../types/SexPerson';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}, filter: Filter) => {
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, (
      { query: event.target.value || null }
    ));

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexPerson).map(([key, value]) => (
          <SearchLink
            key={key}
            params={{ sex: value || null }}
            className={cn({
              'is-active': sex === value,
            })}
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
            value={filter.query}
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

            {centuriesList.map(key => (
              <SearchLink
                key={key}
                data-cy="century"
                className={cn('button mr-1',
                  { 'is-info': centuries.includes(key) })}
                params={{
                  centuries: centuries.includes(key)
                    ? centuries.filter(century => century !== key)
                    : [...centuries, key],
                }}
              >
                {key}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success',
                { 'is-outlined': centuries.length })}
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
