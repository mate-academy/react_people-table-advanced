import cn from 'classnames';

import { SearchLink } from '../SearchLink';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';
import React from 'react';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams | string) => void;
  query: string;
  sex: string | null;
  centuries: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  query,
  sex,
  centuries,
}) => {
  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const clearInput = () => {
    setSearchWith({ query: null });
  };

  const sexFilters = [
    {
      name: 'All',
      sex: null,
    },
    {
      name: 'Male',
      sex: 'm',
    },
    {
      name: 'Female',
      sex: 'f',
    },
  ];

  const allCenturies = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(filter => (
          <SearchLink
            params={{ sex: filter.sex }}
            className={cn({
              'is-active': filter.sex === sex,
            })}
            // "is-active"
            key={filter.name}
          >
            {filter.name}
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

          <span className="icon is-left" onClick={clearInput}>
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
                    ? centuries.filter(ch => century !== ch)
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
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
