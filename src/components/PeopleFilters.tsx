import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: value.trim() ? value : null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Name Filter */}
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

      {/* Century Filter */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => {
              const isSelected = selectedCenturies.includes(century);
              const updatedCenturies = isSelected
                ? selectedCenturies.filter(c => c !== century)
                : [...selectedCenturies, century];

              const targetCenturies = updatedCenturies.length
                ? updatedCenturies
                : null;

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  params={{
                    centuries: targetCenturies,
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${
                selectedCenturies.length === 0 ? '' : 'is-outlined'
              }`}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* Reset All Filters */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
