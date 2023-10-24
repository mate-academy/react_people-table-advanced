import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchparams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuriesParams = searchParams.getAll('centuries');

  const gendersData = [
    { sex: 'All', value: null },
    { sex: 'Male', value: 'm' },
    { sex: 'Female', value: 'f' },
  ];

  const centuriesData = ['16', '17', '18', '19', '20'];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchparams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">

        {gendersData.map(parameter => {
          const { value, sex } = parameter;

          return (
            <SearchLink
              key={parameter.sex}
              params={{ sex: value }}
              className={classNames(
                { 'is-active': searchParams.get('sex') === value },
              )}
            >
              {sex}
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
            {centuriesData.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: centuriesParams.includes(century)
                    ? centuriesParams.filter(
                      savedCentury => savedCentury !== century,
                    ) : [century, ...centuriesParams],
                }}
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuriesParams.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuriesParams.length },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
