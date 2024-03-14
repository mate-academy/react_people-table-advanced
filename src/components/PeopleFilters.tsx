import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const filterField = searchParams.get('sex');

  const enumCenturies = [16, 17, 18, 19, 20];

  function toggleCenturies(newCentury: string) {
    const newCenturies = centuries.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];

    return { centuries: newCenturies };
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = { query: event.target.value.toLowerCase() || null };

    setSearchParams(getSearchWith(searchParams, newQuery));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !filterField })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': filterField === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': filterField === 'f' })}
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
            {enumCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                params={toggleCenturies(century.toString())}
              >
                {century}
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
});
