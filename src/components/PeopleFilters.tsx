import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !searchParams.get('sex'),
          })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
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
            {['16', '17', '18', '19', '20'].map(number => (
              <Link
                key={number}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(number),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(number)
                      ? centuries.filter(num => num !== number)
                      : [...centuries, number],
                  }),
                }}
              >
                {number}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
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
