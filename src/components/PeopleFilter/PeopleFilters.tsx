import React from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

interface Props {
  sex: string
  query: string
  setSearchParams: (nextInit: string) => void
  searchParams: URLSearchParams
  centuries: string[]
}

export const PeopleFilters: React.FC<Props> = React.memo(
  ({
    sex,
    query,
    setSearchParams,
    searchParams,
    centuries,
  }) => {
    const onQueryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newParams = { query: event.target.value.trim() || null };

      const preparedQuery = getSearchWith(searchParams, newParams);

      setSearchParams(preparedQuery);
    };

    const arrayOfCenturies = ['16', '17', '18', '19', '20'];

    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            params={{ sex: null }}
            className={classNames({ 'is-active': !sex })}
          >
            All
          </SearchLink>

          <SearchLink
            params={{ sex: 'm' }}
            className={classNames({ 'is-active': sex === 'm' })}
          >
            Male
          </SearchLink>

          <SearchLink
            params={{ sex: 'f' }}
            className={classNames({ 'is-active': sex === 'f' })}
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
              onChange={onQueryFilter}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {arrayOfCenturies.map(century => (
                <SearchLink
                  key={century}
                  params={{
                    centuries: centuries.includes(century)
                      ? centuries.filter(cent => cent !== century)
                      : [...centuries, century],
                  }}
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(century) },
                  )}
                >
                  {century}
                </SearchLink>
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                params={{
                  centuries: null,
                }}
                data-cy="century"
                className={classNames(
                  'button is-success',
                  { 'is-outlined': centuries.length > 0 },
                )}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <SearchLink
            params={{
              centuries: null,
              query: null,
              sex: null,
            }}
            className="button is-link is-outlined is-fullwidth"
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    );
  },
);
