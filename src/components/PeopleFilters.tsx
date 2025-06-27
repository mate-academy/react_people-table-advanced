import React, { useCallback } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { getSearchParamsAsArray } from '../utils/helpers';
import { SearchLink } from './SearchLink';
import { Sex } from '../types';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex') || '';
  const nameQuery = searchParams.get('query') || '';

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;
      const updatedSearchParams = getSearchWith(searchParams, {
        query: newQuery || null,
      });

      setSearchParams(updatedSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const centuries = Array.from({ length: 5 }, (_, i) => (16 + i).toString());
  const selectedCenturies = getSearchParamsAsArray(searchParams, 'centuries');

  const centuryLinksData = centuries.map(century => {
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    return {
      century,
      params: {
        centuries: newCenturies.length > 0 ? newCenturies : null,
      },
      isActive: selectedCenturies.includes(century),
    };
  });

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': selectedSex === '' })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.Male }}
          className={cn({ 'is-active': selectedSex === Sex.Male })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.Female }}
          className={cn({ 'is-active': selectedSex === Sex.Female })}
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
            value={nameQuery}
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryLinksData.map(item => (
              <SearchLink
                data-cy="century"
                key={item.century}
                params={item.params}
                className={cn('button mr-1', {
                  'is-info': item.isActive,
                })}
              >
                {item.century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={cn('button is-success is-outlined', {
                'is-light': selectedCenturies.length === 0,
              })}
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
            query: null,
            sex: null,
            centuries: null,
            minAge: null,
            maxAge: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
