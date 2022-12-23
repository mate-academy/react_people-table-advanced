import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SortType } from '../types/SortType';
import { getSearchWith } from '../utils/searchHelper';
import { SexFilterLink } from './SexFilterLink';

export const PeopleFilters = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const possibleCenturies = ['16', '17', '18', '19', '20'];

  const onQueryChange = (title: string) => {
    const newQuery = getSearchWith(searchParams, { query: title });

    setSearchParams(newQuery);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexFilterLink sexType={null} text={SortType.ALL} />
        <SexFilterLink sexType="m" text={SortType.MALE} />
        <SexFilterLink sexType="f" text={SortType.FEMALE} />
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {possibleCenturies.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
              )}
              to={{ search: getSearchWith(searchParams, { centuries: [] }) }}
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
              sex: null,
              query: null,
              centuries: [],
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
});
