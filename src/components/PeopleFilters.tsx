import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = ({ query, sex, centuries, allCenturies }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(query || '');

  // Debounce logic for the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      const nextSearchParams = getSearchWith(searchParams, {
        query: inputValue || null,
      });

      setSearchParams(nextSearchParams);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, searchParams, setSearchParams]);

  // Function to reset all filters
  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      {/* Sex Filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={sex === 'all' ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      {/* Name Filter */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
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
            {allCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century).map(String)
                    : [...centuries.map(String), String(century)],
                }}
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={`button is-success is-outlined ${centuries.length === 0 ? '' : ''}`}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      <div className="panel-block">
        <a
          onClick={resetFilters}
          className="button is-link is-outlined is-fullwidth"
          href="#"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
