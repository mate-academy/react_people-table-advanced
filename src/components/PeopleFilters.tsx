import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../components/SearchLink';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const ALL_CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') || '';
  const [queryInput, setQueryInput] = useState(currentQuery);
  const debouncedQuery = useDebounce(queryInput, 500);

  useEffect(() => {
    if (currentQuery !== queryInput) {
      setQueryInput(currentQuery);
    }
  }, [currentQuery, queryInput]);

  const activeCenturies = searchParams.getAll('centuries');
  const currentSex = searchParams.get('sex');

  useEffect(() => {
    if (debouncedQuery !== currentQuery) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);

        if (debouncedQuery.trim()) {
          newParams.set('query', debouncedQuery.trim());
        } else {
          newParams.delete('query');
        }

        return newParams;
      });
    }
  }, [debouncedQuery, currentQuery, setSearchParams]);

  const toggleCentury = useCallback(
    (century: string) => {
      const newCenturies = [...activeCenturies];
      const index = newCenturies.indexOf(century);

      if (index === -1) {
        newCenturies.push(century);
      } else {
        newCenturies.splice(index, 1);
      }

      setSearchParams(prev => {
        const updatedParams = new URLSearchParams(prev);

        updatedParams.delete('centuries');

        newCenturies.forEach(c => {
          updatedParams.append('centuries', c);
        });

        return updatedParams;
      });
    },
    [activeCenturies, setSearchParams],
  );

  const resetAllFilters = () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);

      newParams.delete('query');
      newParams.delete('centuries');
      newParams.delete('sex');
      newParams.delete('sort');
      newParams.delete('order');

      return newParams;
    });
    setQueryInput('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={currentSex === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={currentSex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={currentSex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left is-fullwidth">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {ALL_CENTURIES.map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${activeCenturies.includes(century) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success is-outlined ${activeCenturies.length === 0 ? 'is-active' : ''}`}
              onClick={() =>
                setSearchParams(prev => {
                  const updatedParams = new URLSearchParams(prev);

                  updatedParams.delete('centuries');

                  return updatedParams;
                })
              }
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
