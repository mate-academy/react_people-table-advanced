import React from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const setSearchWith = (paramsToUpdate: SearchParams) => {
    const newParams = getSearchWith(searchParams, paramsToUpdate);

    setSearchParams(newParams);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const getCenturyParams = (centuryToUpdate: number) => {
    const formattedCentury = centuryToUpdate.toString();

    return getSearchWith(searchParams, {
      centuries: centuries.includes(formattedCentury)
        ? centuries.filter(item => item !== formattedCentury)
        : [...centuries, formattedCentury],
    });
  };

  const centuriesConfig = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={classNames({ 'is-active': sex === '' })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </NavLink>
        <NavLink
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </NavLink>
        <NavLink
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesConfig.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={{ search: getCenturyParams(century) }}
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
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
