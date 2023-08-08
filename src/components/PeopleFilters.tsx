import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuriesForRender = '16 17 18 19 20'.split(' ');

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const handleSexChange = (newSex: string | null) => {
    return getSearchWith(searchParams, { sex: newSex });
  };

  const handleCenturies = (newCentury: string | null) => {
    let isIncludesCentury = null;

    if (newCentury) {
      isIncludesCentury = centuries.includes(newCentury)
        ? centuries.filter(century => century !== newCentury)
        : [...centuries, newCentury];
    }

    return getSearchWith(searchParams, { centuries: isIncludesCentury });
  };

  const handleClearAll = () => {
    const newSearchParams = new URLSearchParams('');

    return newSearchParams.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !sex,
          })}
          to={{ search: handleSexChange(null) }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'm',
          })}
          to={{ search: handleSexChange('m') }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': sex === 'f',
          })}
          to={{ search: handleSexChange('f') }}
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
            {centuriesForRender.map(century => (
              <Link
                data-cy="century"
                key={century}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{ search: handleCenturies(century) }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{ search: handleCenturies(null) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className={classNames('button is-link is-fullwidth', {
            'is-outlined': !searchParams.toString(),
          })}
          to={{ search: handleClearAll() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
