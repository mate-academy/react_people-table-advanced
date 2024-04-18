import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import React from 'react';

const SEX_FILTERS = {
  All: null,
  Male: 'm',
  Female: 'f',
};

const CENTURIES_FILTERS = ['16', '17', '18', '19', '20'];

const RESET_FILTERS = {
  centuries: null,
  sex: null,
  query: null,
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') || null;
  const centuriesFilter = searchParams.getAll('centuries') || [];
  const queryFilter = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const toggleCenturies = (selectCentury: string) => {
    return centuriesFilter.includes(selectCentury)
      ? centuriesFilter.filter(century => century !== selectCentury)
      : [...centuriesFilter, selectCentury];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SEX_FILTERS).map(([key, value]) => (
          <SearchLink
            key={key}
            className={classNames({ 'is-active': sexFilter === value })}
            params={{ sex: value }}
          >
            {key}
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
            value={queryFilter}
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
            {CENTURIES_FILTERS.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesFilter.includes(century),
                })}
                params={{ centuries: toggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={RESET_FILTERS}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
