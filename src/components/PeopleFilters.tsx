import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { SexSearchLink } from './SexSearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const centuriesForSearch = ['16', '17', '18', '19', '20'];

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams,
        { query: event.target.value.trimStart() || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexSearchLink sex={null} text="All" />
        <SexSearchLink sex="m" text="Male" />
        <SexSearchLink sex="f" text="Female" />
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
            {centuriesForSearch.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(current => current !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="century"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              searchParams, { sex: null, centuries: null },
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
