import React from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { centuriesList } from '../constants/centuriesList';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

export const PeopleFilters: React.FC<Props> = ({
  setSearchParams,
  searchParams,
}) => {
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || null;

  const handleFilterCenturiesListChange = (century: string) => {
    return centuries?.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];
  };

  const handleChangeQuery = (newValue: string) => {
    setSearchParams(
      new URLSearchParams(
        getSearchWith(searchParams, {
          query: newValue || null,
        }),
      ),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{
            sex: 'f',
          }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            onChange={event => {
              handleChangeQuery(event.target.value);
            }}
            type="search"
            value={searchParams.get('query') || ''}
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
            {centuriesList.map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{
                    centuries: handleFilterCenturiesListChange(century),
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              params={{
                centuries: null,
              }}
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
