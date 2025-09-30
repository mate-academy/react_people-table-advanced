import React, { ChangeEvent } from 'react';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = (searchParams.get('sex') as '' | 'm' | 'f') || '';
  const centuries = searchParams.getAll('centuries');

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{
            sex: null,
          }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{
            sex: 'm',
          }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{
            sex: 'f',
          }}
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
            {['16', '17', '18', '19', '20'].map(centurie => (
              <SearchLink
                params={{
                  centuries: centuries.includes(centurie)
                    ? centuries.filter(ch => ch !== centurie)
                    : [...centuries, centurie],
                }}
                key={centurie}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(centurie),
                })}
              >
                {centurie}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{
                centuries: null,
              }}
              className={classNames('button is-success', {
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
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
