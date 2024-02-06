import { useSearchParams } from 'react-router-dom';
import React from 'react';

import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centenaries = ['16', '17', '18', '19', '20'];
const bodiesSex = [['m', 'Male'], ['f', 'Female']];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const search = getSearchWith(searchParams,
      { query: event.target.value || null });

    setSearchParams(search);
  }

  function toggleCenturies(century: string) {
    return centuries.includes(century)
      ? centuries.filter(existCentury => existCentury !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        {bodiesSex.map(bodySex => (
          <SearchLink
            key={bodySex[0]}
            className={classNames({ 'is-active': sex === bodySex[0] })}
            params={{ sex: bodySex[0] }}
          >
            {bodySex[1]}
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
            {centenaries.map(centenary => (
              <SearchLink
                key={centenary}
                data-cy="century"
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(centenary) })}
                params={{ centuries: toggleCenturies(centenary) }}
              >
                {centenary}
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
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
