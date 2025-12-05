import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);
  const location = useLocation();

  const updateParams = useCallback(
    (fn: (p: URLSearchParams) => void) => {
      const p = new URLSearchParams(searchParams);

      fn(p);
      setSearchParams(p);
    },
    [searchParams, setSearchParams],
  );

  function useDebounce<T>(value: T, delay = 300) {
    const [debounced, setDebounced] = useState<T>(value);

    useEffect(() => {
      const id = setTimeout(() => setDebounced(value), delay);

      return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
  }

  const debouncedQuery = useDebounce(query, 300);

  const centuries = ['16', '17', '18', '19', '20', '21'];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setQuery(value);
  }

  function resetAllFilters() {
    updateParams(p => {
      p.delete('query');
      p.delete('centuries');
      p.delete('userId');
    });

    setQuery('');
    setSelectedCenturies([]);
  }

  function handleSexFilter() {
    updateParams(p => {
      p.delete('sex');
    });
  }

  function toggleCentury(century: string) {
    updateParams(p => {
      const current = p.getAll('centuries');

      if (current.includes(century)) {
        const newCenturies = current.filter(c => c !== century);

        p.delete('centuries');
        newCenturies.forEach(c => p.append('centuries', c));
      } else {
        p.append('centuries', century);
      }

      setSelectedCenturies(p.getAll('centuries'));
    });
  }

  function resetCenturies() {
    updateParams(p => {
      p.delete('centuries');
    });

    setSelectedCenturies([]);
  }

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
    setSelectedCenturies(searchParams.getAll('centuries'));
  }, [searchParams]);

  useEffect(() => {
    updateParams(p => {
      if (debouncedQuery) {
        p.set('query', debouncedQuery);
      } else {
        p.delete('query');
      }
    });
  }, [debouncedQuery, updateParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={location.pathname === '/people' ? 'is-active' : ''}
          onClick={handleSexFilter}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={
            location.pathname === '/people' && searchParams.get('sex') === 'm'
              ? 'is-active'
              : ''
          }
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={
            location.pathname === '/people' && searchParams.get('sex') === 'f'
              ? 'is-active'
              : ''
          }
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
          {centuries.map(centuryItem => (
            <SearchLink
              data-cy={`century${centuryItem}`}
              params={{
                centuries:
                  selectedCenturies.indexOf(centuryItem) !== -1
                    ? selectedCenturies.filter(c => c !== centuryItem)
                    : [...selectedCenturies, centuryItem],
              }}
              key={centuryItem}
              className={classNames('button is-outlined mr-2', {
                'is-success': selectedCenturies.indexOf(centuryItem) !== -1,
              })}
              onClick={() => toggleCentury(centuryItem)}
            >
              {centuryItem}
            </SearchLink>
          ))}

          <SearchLink
            className="button is-outlined"
            data-cy="centuryReset"
            params={{ centuries: null }}
            onClick={resetCenturies}
          >
            All
          </SearchLink>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-light is-fullwidth"
          data-cy="resetAllFilters"
          params={{ query: null, centuries: null, userId: null }}
          onClick={resetAllFilters}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
