import React from 'react';
import cn from 'classnames';

import { useSearchParams } from 'react-router-dom';
import { CENTURIES } from '../utils/constants';
import { getSearchWith } from '../utils/searchHelper';
import { SearchParams, SexFilter } from '../types/SearchParams';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';
  const centuries = searchParams.getAll(SearchParams.Centuries) || [];
  const sex = searchParams.get(SearchParams.Sex) || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith({ query: event.target.value || null }, searchParams),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={sex === SexFilter.All ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={sex === SexFilter.Male ? 'is-active' : ''}
          params={{ sex: SexFilter.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sex === SexFilter.Female ? 'is-active' : ''}
          params={{ sex: SexFilter.Female }}
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
            {CENTURIES.map(century => {
              const toggledCentury = century.toString();

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(toggledCentury),
                  })}
                  params={{
                    centuries: centuries.includes(toggledCentury)
                      ? centuries.filter(item => item !== toggledCentury)
                      : [...centuries, toggledCentury],
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length || !centuries,
              })}
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
          params={{ sex: null, query: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
