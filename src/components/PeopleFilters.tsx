import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const renderCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const query = searchParameters.get('query') || '';
  const sex = searchParameters.get('sex') || '';
  const centuries = searchParameters.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    setSearchParameters(getSearchWith(searchParameters, params));
  };

  const queryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const sexChange = (newSex: string | null) => {
    return getSearchWith(searchParameters, { sex: newSex });
  };

  const clearAll = () => {
    const newSearchParameters = new URLSearchParams('');

    return newSearchParameters.toString();
  };

  const handleCenturies = (newCentury: string | null) => {
    let isCenturyIncludes = null;

    if (newCentury) {
      isCenturyIncludes = centuries.includes(newCentury)
        ? centuries.filter(century => century !== newCentury)
        : [...centuries, newCentury];
    }

    return getSearchWith(searchParameters, { centuries: isCenturyIncludes });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: sexChange(null) }}
          className={classNames({
            'is-active': !sex,
          })}
        >
          All
        </Link>

        <Link
          to={{ search: sexChange('m') }}
          className={classNames({
            'is-active': sex === 'm',
          })}
        >
          Male
        </Link>

        <Link
          to={{ search: sexChange('f') }}
          className={classNames({
            'is-active': sex === 'f',
          })}
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
            onChange={queryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {renderCenturies.map(century => (
              <Link
                data-cy="century"
                key={century}
                to={{ search: handleCenturies(century) }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryAll"
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
            'is-outlined': !searchParameters.toString(),
          })}
          to={{ search: clearAll() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
