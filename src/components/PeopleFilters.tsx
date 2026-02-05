import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState<string>(searchParams.get('query') ?? '');

  useEffect(() => {
    setQuery(searchParams.get('query') ?? '');
  }, [searchParams.toString()]);

  // debounce query changes — include searchParams in deps to avoid stale closure
  useEffect(() => {
    const t = setTimeout(() => {
      const next = query ? query : null;

      navigate({ search: getSearchWith(searchParams, { query: next }) });
    }, 300);

    return () => clearTimeout(t);
  }, [query, searchParams.toString(), navigate]);

  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');

  const toggleCentury = (c: string) => {
    const next = currentCenturies.includes(c)
      ? currentCenturies.filter(x => x !== c)
      : [...currentCenturies, c];

    navigate({
      search: getSearchWith(searchParams, {
        centuries: next.length ? next : null,
      }),
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={currentSex ? '' : 'is-active'}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={currentSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={currentSex === 'f' ? 'is-active' : ''}
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
            {['16', '17', '18', '19', '20'].map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${currentCenturies.includes(c) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(c)}
                type="button"
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
