import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centuriesList = ['16', '17', '18', '19', '20'];
const sexList = {
  All: '',
  Male: 'm',
  Female: 'f',
};

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries: string[] = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const newSearch = getSearchWith(searchParams, params);

    setSearchParams(newSearch);
  }

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const handleToggleCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(prev => prev !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(sexList).map(([key, value]) => (
          <SearchLink
            key={key}
            className={cn({ 'is-active': sex === value })}
            params={{ sex: value === '' ? null : value }}
          >
            {key}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={handleChangeQuery}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(item => (
              <SearchLink
                data-cy="century"
                key={item}
                params={{
                  centuries: handleToggleCenturies(item),
                }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(item),
                })}
              >
                {item}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              params={{
                centuries: null,
              }}
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
