import cn from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setSearchWith } from '../utils/setSearchWith';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const handleQueryChanged = (newQuery: string) => {
    const normalizedQuery = newQuery.trim().toLowerCase();

    setSearchWith(
      searchParams,
      { query: normalizedQuery || null },
      setSearchParams,
    );
    setQuery(newQuery);
  };

  const getNewCenturySearchParams = (newCentury: string) => {
    return centuries?.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({
            'is-active': sex === '',
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({
            'is-active': sex === 'f',
          })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            onChange={(event) => handleQueryChanged(event.target.value)}
            data-cy="NameFilter"
            type="search"
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
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              params={{ centuries: getNewCenturySearchParams('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              params={{ centuries: getNewCenturySearchParams('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              params={{ centuries: getNewCenturySearchParams('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              params={{ centuries: getNewCenturySearchParams('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              params={{ centuries: getNewCenturySearchParams('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
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
          onClick={() => setQuery('')}
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: null,
            query: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
