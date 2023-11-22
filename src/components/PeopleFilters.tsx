import React from 'react';

import cn from 'classnames';

import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

import { SearchLink } from './SearchLink';

type Props = {
  setSearchParams: (value: string) => void,

  searchParams: URLSearchParams,
  centuries: string[],
  query: string,
  sex: string,
};

export const PeopleFilters: React.FC<Props> = ({
  setSearchParams,

  searchParams,
  centuries,
  query,
  sex,
}) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(
      searchParams, { query: event.target.value || null },
    ));
  };

  const allCenturies = ['16', '17', '18', '19', '20'];
  const allSexParams = ['All', 'Male', 'Female'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {allSexParams.map(param => (
          <SearchLink
            key={param}
            params={{
              sex: (param === 'Male' ? 'm' : null)
                || (param === 'Female' ? 'f' : null),
            }}
            className={cn({
              'is-active': (sex === '' && param === 'All')
                || (sex === 'm' && param === 'Male')
                || (sex === 'f' && param === 'Female'),
            })}
          >
            {param}
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
            {allCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter((ct: string) => century !== ct)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
