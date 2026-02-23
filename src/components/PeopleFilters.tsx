import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { useState, useEffect } from 'react';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      const params: SearchParams = { query: query || null };
      const searchString = getSearchWith(searchParams, params);

      setSearchParams(searchString);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchParams, setSearchParams]);

  const selectedCenturies = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const centuries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }}>
          <a className={!sex ? 'is-active' : ''}>All</a>
        </SearchLink>
        <SearchLink params={{ sex: 'm' }}>
          <a className={sex === 'm' ? 'is-active' : ''}>Male</a>
        </SearchLink>
        <SearchLink params={{ sex: 'f' }}>
          <a className={sex === 'f' ? 'is-active' : ''}>Female</a>
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
            onChange={e => setQuery(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(c => (
              <SearchLink
                key={c}
                params={{
                  centuries: selectedCenturies.includes(c)
                    ? selectedCenturies.filter(x => x !== c)
                    : [...selectedCenturies, c],
                }}
              >
                <a
                  data-cy="century"
                  className={`button mr-1 ${
                    selectedCenturies.includes(c) ? 'is-info' : ''
                  }`}
                >
                  {c}
                </a>
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink params={{ centuries: null }}>
              <a data-cy="centuryALL" className="button is-success is-outlined">
                All
              </a>
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink params={{ sex: null, centuries: null, query: null }}>
          <a className="button is-link is-outlined is-fullwidth">
            Reset all filters
          </a>
        </SearchLink>
      </div>
    </nav>
  );
};
