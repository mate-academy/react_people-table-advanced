import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !searchParams.get('sex') })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={event =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value.length ? event.target.value : null,
                }),
              )
            }
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={
              searchParams.get('query')
                ? searchParams.get('query')?.toString()
                : ''
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <SearchLink
                params={{
                  centuries: centuries.includes(`${century}`)
                    ? centuries.filter(c => c !== `${century}`)
                    : [...centuries, `${century}`],
                }}
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
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
        <SearchLink
          params={{
            sex: null,
            centuries: null,
            sort: null,
            order: null,
            query: null,
            slug: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
