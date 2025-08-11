import { SearchLink } from './SearchLink';
import { Sex } from '../types/Sex';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Century } from '../types/Century';

export const PeopleFilters = () => {
  const [query, setQuery] = useState<string>('');
  const [searchParams] = useSearchParams();
  const [sexFilter, setSexFilter] = useState<string | null>(null);
  const [centuriesFilter, setCenturiesFilter] = useState<string[] | null>(null);

  const navigate = useNavigate();

  const getCenturyValues = (cValue: Century): string[] => {
    const centuryValues: string[] = [];

    if (centuriesFilter && centuriesFilter.length > 0) {
      if (centuriesFilter.includes(cValue)) {
        centuryValues.push(...centuriesFilter.filter(c => c !== cValue));
      } else {
        centuryValues.push(...centuriesFilter, cValue);
      }
    } else {
      centuryValues.push(cValue);
    }

    return centuryValues;
  };

  useEffect(() => {
    setSexFilter(searchParams.get('sex'));
    setCenturiesFilter(searchParams.getAll('centuries'));
  }, [searchParams]);

  const handleQueryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = encodeURIComponent(event.target.value);
    const to = getSearchWith(searchParams, {
      query: newQuery ? newQuery : null,
    });

    navigate(`?${to}`);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={sexFilter === null ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={sexFilter === Sex.Male ? 'is-active' : ''}
          params={{ sex: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={sexFilter === Sex.Female ? 'is-active' : ''}
          params={{ sex: Sex.Female }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={event => {
              handleQueryFilter(event);
              setQuery(encodeURIComponent(event.target.value));
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={
                centuriesFilter?.includes(Century.Sixteen)
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              params={{ centuries: getCenturyValues(Century.Sixteen) }}
            >
              {Century.Sixteen}
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={
                centuriesFilter?.includes(Century.Seventeen)
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              params={{ centuries: getCenturyValues(Century.Seventeen) }}
            >
              {Century.Seventeen}
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={
                centuriesFilter?.includes(Century.Eighteen)
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              params={{ centuries: getCenturyValues(Century.Eighteen) }}
            >
              {Century.Eighteen}
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={
                centuriesFilter?.includes(Century.Nineteen)
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              params={{ centuries: getCenturyValues(Century.Nineteen) }}
            >
              {Century.Nineteen}
            </SearchLink>
            <SearchLink
              data-cy="century"
              className={
                centuriesFilter?.includes(Century.Twenty)
                  ? 'button mr-1 is-info'
                  : 'button mr-1'
              }
              params={{ centuries: getCenturyValues(Century.Twenty) }}
            >
              {Century.Twenty}
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={
                centuriesFilter
                  ? 'button is-success is-outlined'
                  : 'button is-success'
              }
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
