import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './SearchLink';

const sexFilters = [
  { title: 'All', query: null },
  { title: 'Male', query: 'm' },
  { title: 'Female', query: 'f' },
];

const centuriesFilters = [
  { title: '16', query: '16' },
  { title: '17', query: '17' },
  { title: '18', query: '18' },
  { title: '19', query: '19' },
  { title: '20', query: '20' },
];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex');
  const nameFilter = searchParams.get('name') || '';
  const centuriesFilter = searchParams.getAll('centuries');

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newParams = new URLSearchParams(searchParams);

    if (event.target.value) {
      newParams.set('name', event.target.value);
    } else {
      newParams.delete('name');
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(filter => (
          <SearchLink
            key={filter.title}
            params={{ sex: filter.query }}
            className={cn({
              'is-active': sexFilter === filter.query,
            })}
          >
            {filter.title}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            type="search"
            data-cy="NameFilter"
            value={nameFilter}
            placeholder="Search"
            className="input"
            onChange={handleNameFilterChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesFilters.map(filter => (
              <SearchLink
                key={filter.title}
                data-cy="century"
                params={{
                  centuries: centuriesFilter.includes(filter.query)
                    ? centuriesFilter
                      .filter(century => century !== filter.query)
                    : [...centuriesFilter, filter.query],
                }}
                className={cn('button mr-1', {
                  'is-info': centuriesFilter.includes(filter.query),
                })}
              >
                {filter.title}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={cn('button is-success', {
                'is-outlined': !!centuriesFilter.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            name: null,
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
