import React, { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

const CENTURIES = [16, 17, 18, 19, 20] as const;
const SEX_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'm', label: 'Male' },
  { key: 'f', label: 'Female' },
] as const;

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');

  const selectedCenturies = useMemo(
    () => new Set(searchParams.getAll('centuries').map(Number)),
    [searchParams],
  );

  const toggleCentury = useCallback(
    (c: number) => {
      const next = selectedCenturies.has(c)
        ? Array.from(selectedCenturies).filter(v => v !== c)
        : [...Array.from(selectedCenturies), c];

      return next.map(String);
    },
    [selectedCenturies],
  );

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value.trim() || null;

      setSearchParams(getSearchWith(searchParams, { query: value }));
    },
    [searchParams, setSearchParams],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_OPTIONS.map(({ key, label }) => (
          <SearchLink
            key={key}
            params={{ sex: key === 'all' ? null : key }}
            className={cn({
              'is-active': (key === 'all' && !sex) || sex === key,
            })}
          >
            {label}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left is-flex-grow-1">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search by name..."
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
            {CENTURIES.map(c => (
              <SearchLink
                key={c}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': selectedCenturies.has(c),
                })}
                params={{ centuries: toggleCentury(c) }}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': selectedCenturies.size > 0,
                'is-active': selectedCenturies.size === 0,
              })}
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
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
