import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SexTypes } from '../types/Sex';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || 'all';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const centuryList = ['16', '17', '18', '19', '20'];

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = getSearchWith(searchParams,
      { query: event.target.value || null });

    setSearchParams(newQuery);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexTypes).map((sexType: [string, string]) => {
          const [name, value] = sexType;
          const newValue = value === 'all' ? null : value;

          return (
            <SearchLink
              className={
                classNames({ 'is-active': (sex === value) })
              }
              key={name}
              params={{ sex: newValue }}
            >
              {name}
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
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">

            {centuryList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cen => cen !== century)
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
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length },
              )}
              params={{ centuries: [] }}
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
