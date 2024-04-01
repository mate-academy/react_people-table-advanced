import { useSearchParams } from 'react-router-dom';
import { SearchParamsValue } from '../types/SearchParamsValue';
import React from 'react';
import { CENTURIES } from '../constants/TableSort';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchName = searchParams.get(SearchParamsValue.Query) || '';
  const sortBySex = searchParams.get(SearchParamsValue.Sex) || '';
  const sortByCentury = searchParams.getAll(SearchParamsValue.Centuries) || [];

  const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set(SearchParamsValue.Query, event.target.value);
    } else {
      params.delete(SearchParamsValue.Query);
    }

    setSearchParams(params);
  };

  const handleCenturies = (century: string) => {
    const newCenturies = sortByCentury.includes(century)
      ? sortByCentury.filter(item => item !== century)
      : [...sortByCentury, century];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sortBySex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sortBySex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sortBySex === 'f' })}
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
            value={searchName}
            onChange={handleSearchName}
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
                params={{ centuries: handleCenturies(century) }}
                data-cy={century}
                className={classNames('button mr-1', {
                  'is-info': sortByCentury.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': !sortByCentury.length,
                'is-outlined': !!sortByCentury.length,
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
          params={{
            query: null,
            sex: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
