import { ChangeEvent, FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { URLSearchParamsInit } from 'react-router-dom';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParamsInit) => void;
};

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters: FC<Props> = ({ searchParams, setSearchParams }) => {
  const [query, setQuery] = useState<string>('');
  const sexUrl = searchParams.get('sex');
  const centuriesUrl = searchParams.getAll('centuries');

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleCenturyClick = (value: number) => {
    const currentCenturies = searchParams.getAll('centuries');
    const stringValue = String(value);

    const newCenturies = currentCenturies.includes(stringValue)
      ? currentCenturies.filter(c => c !== stringValue)
      : [...currentCenturies, stringValue];

    const newSearch = getSearchWith(searchParams, {
      centuries: newCenturies.length > 0 ? newCenturies : null,
    });

    setSearchParams(new URLSearchParams(newSearch));
  };

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);

    const newSearch = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(new URLSearchParams(newSearch));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sexUrl })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sexUrl === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sexUrl === 'f' })}
          params={{ sex: 'f' }}
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
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <button
                key={century}
                type="button"
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuriesUrl.includes(century),
                })}
                onClick={() => handleCenturyClick(+century)}
              >
                {century}
              </button>
            ))}

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                params={{ centuries: null }}
                className={cn('button', {
                  'is-success': centuriesUrl.length === 0,
                })}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            centuries: null,
            sex: null,
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
