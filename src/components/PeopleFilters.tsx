import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

import { SearchParamsOptions } from '../types/enums';
import cn from 'classnames';
import { SearchParamsType } from '../types';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SearchParamsOptions.query) || '';
  const centuries = searchParams.getAll(SearchParamsOptions.centuries) || [];

  const setSearchWith = (params: SearchParamsType['query']) => {
    const newParams = getSearchWith(searchParams, {
      [SearchParamsOptions.query]: params || null,
    });

    setSearchParams(newParams);
  };

  const handleQuewryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith(
      query.length < 1 ? event.target.value.trim() : event.target.value,
    );
  };

  const toggleCentury = (century: number) => {
    const stringCentury = String(century);
    const newCenturyList = centuries.includes(stringCentury)
      ? centuries.filter(item => item !== stringCentury)
      : [...centuries, stringCentury];

    return newCenturyList;
  };

  const centuriesList = [16, 17, 18, 19, 20];
  const sexList = [
    ['All', null],
    ['Male', 'm'],
    ['Female', 'f'],
  ];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexList.map(item => (
          <SearchLink
            className={cn({
              'is-active':
                searchParams.get(SearchParamsOptions.sex) === item[1],
            })}
            params={{
              [SearchParamsOptions.sex]: item[1],
            }}
            key={item[0]}
          >
            {item[0]}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQuewryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <SearchLink
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': searchParams
                    .getAll(SearchParamsOptions.centuries)
                    .includes(String(century)),
                })}
                params={{
                  [SearchParamsOptions.centuries]: toggleCentury(century),
                }}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{
                centuries: null,
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
