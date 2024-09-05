import classNames from 'classnames';
import React, { ChangeEvent } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuriesOptions = ['16', '17', '18', '19', '20'];
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchedValue = getSearchWith(searchParams, {
      query: event.target.value || '',
    });

    setSearchParams(searchedValue);
  };

  const handleTogglingCenturies = (selectedCentury: string) => {
    const toggleCenturies = centuries.includes(selectedCentury)
      ? centuries.filter(century => century !== selectedCentury)
      : [...centuries, selectedCentury];

    return { centuries: toggleCenturies };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
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
            value={query}
            onChange={handleQueryChange}
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
            {centuriesOptions.map(century => (
              <SearchLink
                data-cy="century"
                className={classNames('button', {
                  'is-info': centuries.includes(century),
                })}
                params={handleTogglingCenturies(century)}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
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
          params={{ centuries: [], query: '', sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
