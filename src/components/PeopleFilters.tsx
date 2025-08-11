import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  function handleCenturyClick(century: string) {
    const currentCenturies = searchParams.getAll('centuries');
    let newCenturies: string[] = [];

    if (currentCenturies.includes(century)) {
      newCenturies = currentCenturies.filter(cent => cent !== century);
    } else {
      newCenturies = [...currentCenturies, century];
    }

    return getSearchWith(searchParams, { centuries: newCenturies });
  }

  function isActive(paramKey: string, value: string) {
    const paramValues = searchParams.getAll(paramKey);

    return paramValues.includes(value);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newParams = new URLSearchParams(searchParams);

    const queryValue = event.target.value;

    if (queryValue) {
      newParams.set('query', queryValue);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }

  function resetFilters() {
    const newSearch = new URLSearchParams(searchParams.toString());

    newSearch.delete('sex');
    newSearch.delete('query');
    newSearch.delete('centuries');

    return newSearch.toString();
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !searchParams.has('sex') })}
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>

        <Link
          className={classNames({ 'is-active': isActive('sex', 'm') })}
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': isActive('sex', 'f') })}
          to={{
            pathname: location.pathname,
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchParams.get('query') || ''}
            onChange={handleQueryChange}
            data-cy="NameFilter"
            type="search"
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
            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': isActive('centuries', '16'),
              })}
              to={{
                pathname: location.pathname,
                search: handleCenturyClick('16'),
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': isActive('centuries', '17'),
              })}
              to={{
                pathname: location.pathname,
                search: handleCenturyClick('17'),
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': isActive('centuries', '18'),
              })}
              to={{
                pathname: location.pathname,
                search: handleCenturyClick('18'),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': isActive('centuries', '19'),
              })}
              to={{
                pathname: location.pathname,
                search: handleCenturyClick('19'),
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': isActive('centuries', '20'),
              })}
              to={{
                pathname: location.pathname,
                search: handleCenturyClick('20'),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.has('centuries'),
              })}
              to={{
                pathname: location.pathname,
                search: getSearchWith(searchParams, { centuries: null }),
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
          to={{ pathname: location.pathname, search: resetFilters() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
