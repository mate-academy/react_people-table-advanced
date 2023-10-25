import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centuriesArray = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(
      searchParams, { query: event.target.value || null },
    );

    setSearchParams(search);
  };

  const handleCenturyToggle = (chosenCentury: string) => {
    return {
      centuries: centuries.includes(chosenCentury)
        ? centuries.filter(century => chosenCentury !== century)
        : [...centuries, chosenCentury],
    };
  };

  const resetSearchParams = () => {
    return {
      centuries: [],
      sex: null,
      query: null,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === 'f',
          })}
          params={{ sex: 'f' }}
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
            {centuriesArray.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={handleCenturyToggle(century)}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
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
          params={resetSearchParams()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
