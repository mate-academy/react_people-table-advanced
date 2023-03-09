import classNames from 'classnames';
import React, { useRef } from 'react';
import {
  NavLink,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import { Filter } from '../types/Filter';
import { Search } from '../types/Search';
import { SearchParams } from '../utils/searchHelper';

import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexParams = searchParams.get(Search.sex);
  const centuriesParams = searchParams.getAll(Search.centuries) || [];
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const filteredSexParamsUpdate = (
    filterType?: Filter,
  ): SearchParams => {
    switch (filterType) {
      case Filter.female:
        return { sex: Filter.female };
      case Filter.male:
        return { sex: Filter.male };
      default:
        return { sex: null };
    }
  };

  const checkDuplication = (century: Filter) => {
    return centuriesParams.includes(century)
      ? centuriesParams.filter(current => current !== century)
      : [...centuriesParams, century];
  };

  const filtercenturiesParamsUpdate = (filterType?: Filter):SearchParams => {
    const centuries = filterType ? checkDuplication(filterType) : [];

    return { centuries };
  };

  const onQueryParamsUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue) {
      searchParams.set(Search.query, inputValue);
    } else {
      searchParams.delete(Search.query);
    }

    setSearchParams(searchParams);
  };

  const resetQuery = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="sexParamsFilter">
        <SearchLink
          params={filteredSexParamsUpdate()}
          className={classNames(
            { 'is-active': sexParams === null },
          )}
        >
          All
        </SearchLink>
        <SearchLink
          params={filteredSexParamsUpdate(Filter.male)}
          className={classNames(
            { 'is-active': sexParams === Filter.male },
          )}
        >
          Male
        </SearchLink>
        <SearchLink
          params={filteredSexParamsUpdate(Filter.female)}
          className={classNames(
            { 'is-active': sexParams === Filter.female },
          )}
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
            ref={inputRef}
            onChange={onQueryParamsUpdate}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(Filter).slice(2).map(century => (
              <SearchLink
                params={filtercenturiesParamsUpdate(century)}
                key={century}
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuriesParams.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={filtercenturiesParamsUpdate()}
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuriesParams },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <NavLink
          to={location.pathname}
          className={(fulfilled) => classNames(
            'button',
            'is-link',
            'is-outlined',
            { 'is-fullwidth': fulfilled },
          )}
          onClick={() => resetQuery()}
        >
          Reset all filters
        </NavLink>
      </div>
    </nav>
  );
};
