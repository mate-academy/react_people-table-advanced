import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { useCallback } from 'react';
import { useSearchFilters } from '../hooks/useSearchFilters';

const GENDER_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
] as const;

const CENTURY_OPTIONS = [16, 17, 18, 19, 20] as const;

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    sex: activeSex,
    query,
    centuries: activeCenturies,
  } = useSearchFilters();

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value.trim();
      const params = new URLSearchParams(searchParams);

      if (newQuery) {
        params.set('query', newQuery);
      } else {
        params.delete('query');
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const getCenturyToggleParams = useCallback(
    (century: number) => {
      const centuryStr = century.toString();
      const isActive = activeCenturies.includes(centuryStr);

      return isActive
        ? activeCenturies.filter(c => c !== centuryStr)
        : [...activeCenturies, centuryStr];
    },
    [activeCenturies],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {GENDER_OPTIONS.map(({ value, label }) => (
          <SearchLink
            key={value || 'all'}
            params={{ sex: value || null }}
            className={classNames({ 'is-active': activeSex === value })}
          >
            {label}
          </SearchLink>
        ))}
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
            {CENTURY_OPTIONS.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': activeCenturies.includes(century.toString()),
                })}
                params={{ century: getCenturyToggleParams(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, century: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
