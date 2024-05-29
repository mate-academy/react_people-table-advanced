import classNames from "classnames";
import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchParams, getSearchWith } from "../utils/searchHelper";
import { SearchLink } from "./SearchLink";

export enum Status {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters = () => {
  const centuriesArray = ['16', '17', '18', '19', '20'];
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      const search = getSearchWith(searchParams, params);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const getNewCenturies = (newCentury: string) => {
    const newCenturies = centuries.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];

    return newCenturies;
  };

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
          params={{ sex: Status.Male }}
          className={classNames({ 'is-active': sex === Status.Male })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: Status.Female }}
          className={classNames({ 'is-active': sex === Status.Female })}
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
            {centuriesArray.map(century => {
              return (
                <SearchLink
                  key={century}
                  params={{ centuries: getNewCenturies(century) }}
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={classNames('button mr-1 is-success', {
                'is-outlined': centuries.length,
              })}
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: [],
            query: [],
            centuries: [],
          }}
          className={'button is-link is-outlined is-fullwidth'}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
