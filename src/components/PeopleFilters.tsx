import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams as SP } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') ?? '';
  const centuryOptions = ['16', '17', '18', '19', '20'];
  const selectedCenturies = searchParams.getAll('centuries');

  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    const newParams = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const toggleCentury = (c: string) => {
    const current = searchParams.getAll('centuries');
    const has = current.includes(c);
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('centuries');

    if (!has) {
      const next = Array.from(new Set([...current, c]));

      next.forEach(v => newParams.append('centuries', v));
    } else {
      const next = current.filter(x => x !== c);

      next.forEach(v => newParams.append('centuries', v));
    }

    setSearchParams(newParams);
  };

  const clearAll = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null } as SP}>
          <a className={!searchParams.get('sex') ? 'is-active' : ''}>All</a>
        </SearchLink>

        <SearchLink params={{ sex: 'm' }}>
          <a className={searchParams.get('sex') === 'm' ? 'is-active' : ''}>
            Male
          </a>
        </SearchLink>

        <SearchLink params={{ sex: 'f' }}>
          <a className={searchParams.get('sex') === 'f' ? 'is-active' : ''}>
            Female
          </a>
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
            {centuryOptions.map(c => {
              const isSelected = selectedCenturies.includes(c);

              return (
                <button
                  key={c}
                  data-cy="century"
                  onClick={() => toggleCentury(c)}
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  type="button"
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              type="button"
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());

                newParams.delete('centuries');
                setSearchParams(newParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          type="button"
          onClick={clearAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
