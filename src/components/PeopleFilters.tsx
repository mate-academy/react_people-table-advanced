import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { CENTURIES } from '../constants';
import { SearchParamsValue } from '../types/SearchParamsValue';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchName = searchParams.get(SearchParamsValue.QUERY) || '';
  const sortBySex = searchParams.get(SearchParamsValue.SEX) || '';
  const sortByCentury = searchParams.getAll(SearchParamsValue.CENTURIES) || [];

  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set(SearchParamsValue.QUERY, e.target.value);
    } else {
      params.delete(SearchParamsValue.QUERY);
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
        <Link
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
          className={classNames('', { 'is-active': !sortBySex })}
        >
          All
        </Link>
        <Link
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
          className={classNames('', { 'is-active': sortBySex === 'm' })}
        >
          Male
        </Link>
        <Link
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
          className={classNames('', { 'is-active': sortBySex === 'f' })}
        >
          Female
        </Link>
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
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': sortByCentury.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': !sortByCentury.length,
                'is-outlined': !!sortByCentury.length,
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: null,
                }),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(searchParams, {
              query: null,
              sex: null,
              centuries: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
