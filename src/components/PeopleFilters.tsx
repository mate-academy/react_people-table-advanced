import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import React from 'react';
import { FilterType } from '../types/FilterType';

const CENTURIES = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const toggleCentuires = (newCentury: string) => {
    return centuries.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!event.target.value) {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === FilterType.MALE })}
          params={{ sex: FilterType.MALE }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === FilterType.FEMALE })}
          params={{ sex: FilterType.FEMALE }}
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
            onChange={handleQuery}
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
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                params={{ centuries: toggleCentuires(century.toString()) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
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
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
