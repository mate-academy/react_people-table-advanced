import React from 'react';
import classNames from 'classnames';
import { useTableContext } from '../Context';
import { SearchLink } from '../SearchLink/SearchLink';

export const PeopleFilters = () => {
  const {
    searchParams,
    setSearchParams,
    query,
    gender,
    centuries,
    centuriesArr,
  } = useTableContext();

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !gender })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': gender === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': gender === 'f' })}
          params={{ sex: 'f' }}
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
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArr.map(century => {
              return (
                <SearchLink
                  data-cy="century"
                  params={{
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }}
                  key={century}
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries,
              })}
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
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
