/* eslint-disable prettier/prettier */
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';

import { SearchLink } from './SearchLink';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const centuries = ['16', '17', '18', '19', '20'];

  const getSexClass = (sex: string | null) => {
    if (sex === null && selectedSex === null) {
      return 'is-active';
    }

    return selectedSex === sex ? 'is-active' : '';
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{
            sex: null,
          }}
          className={getSexClass(null)}
        >
          All
        </SearchLink>

        <SearchLink
          params={{
            sex: 'm',
          }}
          className={getSexClass('m')}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{
            sex: 'f',
          }}
          className={getSexClass('f')}
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
            onChange={event => {
              const value = event.target.value;

              const search = getSearchWith(searchParams, {
                query: value || null,
              });

              window.history.pushState(
                null,
                '',
                `${window.location.pathname}${search}`,
              );

              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {centuries.map(century => {
              const isSelected = selectedCenturies.includes(century);

              const newCenturies = isSelected
                ? selectedCenturies.filter(item => item !== century)
                : [...selectedCenturies, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  params={{
                    centuries:
                      newCenturies.length > 0 ? newCenturies : null,
                  }}
                  className={`button mr-1 ${
                    isSelected ? 'is-info' : ''
                  }`}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{
                centuries: null,
              }}
              className="button is-success is-outlined"
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
            query: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
