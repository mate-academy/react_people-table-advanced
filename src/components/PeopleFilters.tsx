import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../utils/searchHelper';

import { SexFilter } from '../types/SexFilter';

import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(
      searchParams, { query: event.target.value || null },
    ));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilter).map(([key, value]) => (
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
            value={query}
            onChange={handleSearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(age => century !== age)
                    : [...centuries, century],
                }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{ search: '' }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
