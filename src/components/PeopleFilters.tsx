import React, { useState } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const toggleCentury = (century: string): string[] => {
    if (selectedCenturies.includes(century)) {
      return selectedCenturies.filter(c => c !== century);
    }

    return [...selectedCenturies, century];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    const newSearchParams = new URLSearchParams(searchParams);

    if (newQuery) {
      newSearchParams.set('query', newQuery);
    } else {
      newSearchParams.delete('query');
    }

    setSearchParams(newSearchParams);
  };

  const isAllActive = selectedCenturies.length === 0;

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={searchParams.get('sex') === null ? 'is-active' : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
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
            onChange={handleQueryChange}
            value={query}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                params={{ centuries: toggleCentury(century) }}
                className={`button mr-1 ${
                  selectedCenturies.includes(century) ? 'is-info' : ''
                }`}
                data-cy="century"
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              className={`button is-success ${
                isAllActive ? '' : 'is-outlined'
              }`}
              data-cy="centuryALL"
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
