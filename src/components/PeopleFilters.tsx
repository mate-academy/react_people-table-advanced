import React from 'react';

import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../types/SexFilter';

const sexList = [
  { key: 'all', value: 'All' },
  { key: 'm', value: 'Male' },
  { key: 'f', value: 'Female' },
];

export enum FilterNames {
  Sex = 'sex',
  Query = 'query',
}

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(FilterNames.Sex) || SexFilter.All;
  const query = searchParams.get(FilterNames.Query) || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set(FilterNames.Query, event.target.value);

    if (params.has(FilterNames.Query) && !event.target.value) {
      params.delete(FilterNames.Query);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexList.map(({ key, value }) => {
          return (
            <SearchLink
              key={key}
              params={{ sex: key === SexFilter.All ? null : key }}
              className={cn({ 'is-active': sex === key })}
            >
              {value}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
