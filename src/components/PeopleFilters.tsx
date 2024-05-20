// import { ChangeEvent, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { ChangeEvent } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { ALL_CENTURIES } from '../constants';
import { getFilters } from '../utils/getFilters';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { filterBySex, centuries, filterByQuery } = getFilters(searchParams);

  const handlerChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: e.target.value || null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': filterBySex === '',
          })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': filterBySex === 'm',
          })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': filterBySex === 'f',
          })}
          params={{
            sex: 'f',
          }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={handlerChangeQuery}
            value={filterByQuery}
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
            {ALL_CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(item => item !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: null,
              }}
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
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
