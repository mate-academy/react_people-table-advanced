import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';
import { Sex } from '../types/Sex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNameFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const newParams = getSearchWith(searchParams, { query: value || null });

    setSearchParams(newParams);
  };

  const currentSex = searchParams.get('sex');

  const query = searchParams.get('query') || '';

  const currentCenturies = searchParams.getAll('centuries');

  const toggleCenturyLink = (century: string) => {
    const updated = currentCenturies.includes(century)
      ? currentCenturies.filter(c => c !== century)
      : [...currentCenturies, century];

    return {
      pathname: '/people',
      search: getSearchWith(searchParams, {
        centuries: updated.length ? updated : null,
      }),
    };
  };

  const toggleAllCenturies = () => {
    const allCenturies = ['16', '17', '18', '19', '20'];
    const newParams = getSearchWith(searchParams, {
      centuries:
        currentCenturies.length === allCenturies.length ? null : allCenturies,
    });

    setSearchParams(newParams);
  };

  const handleResetAllFilters = () => {
    const newParams = getSearchWith(searchParams, {
      query: null,
      sex: null,
      centuries: null,
      sort: null,
      order: null,
    });

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: null }),
          }}
          className={cn({ 'is-active': currentSex === null })}
        >
          All
        </Link>

        <Link
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: Sex.M }),
          }}
          className={cn({ 'is-active': currentSex === Sex.M })}
        >
          Male
        </Link>

        <Link
          to={{
            pathname: '/people',
            search: getSearchWith(searchParams, { sex: Sex.F }),
          }}
          className={cn({ 'is-active': currentSex === Sex.F })}
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
            value={query}
            onChange={handleNameFilter}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': currentCenturies.includes('16'),
              })}
              to={toggleCenturyLink('16')}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': currentCenturies.includes('17'),
              })}
              to={toggleCenturyLink('17')}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': currentCenturies.includes('18'),
              })}
              to={toggleCenturyLink('18')}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': currentCenturies.includes('19'),
              })}
              to={toggleCenturyLink('19')}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': currentCenturies.includes('20'),
              })}
              to={toggleCenturyLink('20')}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': currentCenturies.length !== 0,
              })}
              onClick={toggleAllCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetAllFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
