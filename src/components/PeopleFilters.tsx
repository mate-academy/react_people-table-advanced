import React from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { centuryValues } from '../constants';

type Props = {
  query: string;
  centuries: string[];
  searchParams: URLSearchParams;
  setSearchParams: (params: string) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  centuries,
  searchParams,
  setSearchParams,
}) => {
  const location = useLocation();
  const resetAllParams = {
    sex: null,
    query: null,
    centuries: null,
  };

  const getSelectedCenturyParams = (century: string) => ({
    centuries: centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century],
  });

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !searchParams.get('sex'),
          })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
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
            {centuryValues.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={getSelectedCenturyParams(century)}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className={classNames('button', 'is-success', {
                'is-outlined': location.search.includes('centuries'),
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={resetAllParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
