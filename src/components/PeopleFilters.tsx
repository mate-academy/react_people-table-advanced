import { useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';
import { CENTURIES } from '../constants/searchConsts';
import { setSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const handleCenturies = (currentCentury: string) => {
    return centuries.includes(currentCentury)
      ? centuries.filter(prev => prev !== currentCentury)
      : [...centuries, currentCentury];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({
      query: event.target.value || null,
    }, searchParams, setSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{
            sex: null,
          }}
          className={classNames({
            'is-active': sex === Sex.All,
          })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{
            sex: 'm',
          }}
          className={classNames({
            'is-active': sex === Sex.Male,
          })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{
            sex: 'f',
          }}
          className={classNames({
            'is-active': sex === Sex.Female,
          })}
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
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: handleCenturies(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              params={{
                centuries: [],
              }}
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
