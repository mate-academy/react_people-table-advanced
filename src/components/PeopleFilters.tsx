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
  Centuries = 'centuries',
}

const centuriesArray = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(FilterNames.Sex) || SexFilter.All;
  const query = searchParams.get(FilterNames.Query) || '';
  const centuries = searchParams.getAll(FilterNames.Centuries) || [];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set(FilterNames.Query, event.target.value);

    if (params.has(FilterNames.Query) && !event.target.value) {
      params.delete(FilterNames.Query);
    }

    setSearchParams(params);
  };

  const getSelectedCenturies = (value: string) => {
    if (centuries.includes(value)) {
      return centuries.filter(century => century !== value);
    } else {
      return [...centuries, value];
    }
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
            {centuriesArray.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: getSelectedCenturies(century),
                }}
                data-cy="century"
                className={cn('button mr-1 ', {
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
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: [], sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
