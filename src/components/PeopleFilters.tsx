import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const toggleNumbers = (ch: string) => {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(cen => cen !== ch)
      : [...centuries, ch];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': sex === '' })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            type="search"
            className="input"
            placeholder="Search"
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: toggleNumbers(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
