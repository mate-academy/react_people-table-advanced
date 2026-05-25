import classNames from 'classnames';

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const CENTURIES = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: value || null,
      }),
    );
  };

  const toggleCentury = (number: string) => {
    const newCenturies = centuries.includes(number)
      ? centuries.filter(century => century !== number)
      : [...centuries, number];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length ? newCenturies : null,
      }),
    );
  };

  const resetCenturyFilters = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: null,
      }),
    );
  };

  const resetFilters = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
        sex: null,
        centuries: null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !searchParams.get('sex'),
          })}
          to={`?${getSearchWith(searchParams, { sex: null })}`}
        >
          All
        </Link>

        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={`?${getSearchWith(searchParams, { sex: 'm' })}`}
        >
          Male
        </Link>

        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={`?${getSearchWith(searchParams, { sex: 'f' })}`}
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
            {CENTURIES.map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                href="/people"
                onClick={event => {
                  event.preventDefault();
                  toggleCentury(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href={`?${getSearchWith(searchParams, { centuries: null })}`}
              onClick={resetCenturyFilters}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href={`?${getSearchWith(searchParams, { query: null, sex: null, centuries: null, sort: null, order: null })}`}
          onClick={resetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
