import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Filter } from '../types/Filter';
import { Search } from '../types/Search';
import { SearchParams } from '../utils/searchHelper';

import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  const filteredSexParamsUpdate = (filterType?: Filter): SearchParams => {
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
    return centuries.includes(century)
      ? centuries.filter(current => current !== century)
      : [...centuries, century];
  };

  const filterCenturiesParamsUpdate = (filterType?: Filter):SearchParams => {
    switch (filterType) {
      case Filter.sixteenth:
        return { centuries: checkDuplication(Filter.sixteenth) };
      case Filter.seventeenth:
        return { centuries: checkDuplication(Filter.seventeenth) };
      case Filter.eighteenth:
        return { centuries: checkDuplication(Filter.eighteenth) };
      case Filter.nineteenth:
        return { centuries: checkDuplication(Filter.nineteenth) };
      case Filter.twentieth:
        return { centuries: checkDuplication(Filter.twentieth) };
      default:
        return { centuries: [] };
    }
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

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={filteredSexParamsUpdate()}
          className={classNames(
            { 'is-active': sex === null },
          )}
        >
          All
        </SearchLink>
        <SearchLink
          params={filteredSexParamsUpdate(Filter.male)}
          className={classNames(
            { 'is-active': sex === Filter.male },
          )}
        >
          Male
        </SearchLink>
        <SearchLink
          params={filteredSexParamsUpdate(Filter.female)}
          className={classNames(
            { 'is-active': sex === Filter.female },
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
                params={filterCenturiesParamsUpdate(century)}
                key={century}
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
              params={filterCenturiesParamsUpdate()}
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
