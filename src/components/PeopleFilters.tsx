import React, { ChangeEvent, useCallback } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

type PeopleFiltersProps = {
  isReady: boolean;
};

type SexValue = 'm' | 'f' | null;

const CENTURY_FILTERS = [16, 17, 18, 19, 20] as const;

const SEX_FILTERS: Array<{ label: string; value: SexValue }> = [
  { label: 'All', value: null },
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
] as const;

const PARAM_KEYS = ['centuries', 'query', 'sex', 'sort', 'order'] as const;

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({ isReady }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // read current values
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams);

      if (value.trim() === '') {
        params.delete('query');
      } else {
        params.set('query', value);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleSexChange = useCallback(
    (next: SexValue) => {
      const params = new URLSearchParams(searchParams);

      if (next === null) {
        params.delete('sex');
      } else {
        params.set('sex', next);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleToggleCentury = useCallback(
    (century: number) => {
      const c = String(century);
      const current = searchParams.getAll('centuries');
      const has = current.includes(c);
      const next = has ? current.filter(v => v !== c) : [...current, c];

      const params = new URLSearchParams(searchParams);

      params.delete('centuries');

      if (next.length > 0) {
        next.forEach(v => params.append('centuries', v));
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const clearAllCenturies = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const resetAll = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    for (const key of PARAM_KEYS) {
      params.delete(key);
    }

    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  if (!isReady) {
    return null;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {}
      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTERS.map(option => {
          const isActive =
            (option.value === null && sex === null) || sex === option.value;

          return (
            <button
              key={option.label}
              type="button"
              className={cn({ 'is-active': isActive })}
              onClick={() => handleSexChange(option.value)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </p>

      {}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
            aria-label="Filter by name"
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURY_FILTERS.map(century => {
              const hasCentury = centuries.includes(String(century));

              return (
                <button
                  key={century}
                  data-cy="century"
                  type="button"
                  className={cn('button mr-1', { 'is-info': hasCentury })}
                  onClick={() => handleToggleCentury(century)}
                  aria-pressed={hasCentury}
                >
                  {century}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryAll"
              type="button"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              onClick={clearAllCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="panel-block">
        <button
          type="button"
          className={cn('button is-link is-fullwidth', {
            'is-outlined': centuries.length > 0 || query !== '' || sex !== null,
          })}
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
