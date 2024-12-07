import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import classNames from 'classnames';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const resetFilters = {
    sex: null,
    centuries: null,
    query: null,
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            value={query || ''}
            onChange={e =>
              setSearchParams(
                {
                  ...Object.fromEntries(searchParams.entries()),
                  query: e.target.value || '',
                },
                { replace: true },
              )
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
                key={century}
                params={{
                  centuries: centuries.includes(century.toString())
                    ? centuries.filter(c => c !== century.toString())
                    : [...centuries, century.toString()],
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                data-cy="century"
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={resetFilters}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
