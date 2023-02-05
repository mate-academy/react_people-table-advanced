import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  query: string,
  sex: string,
  centuries: string[],
  searchParams: URLSearchParams,
  setSearchParams: (value: string) => void,
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  sex,
  centuries,
  searchParams,
  setSearchParams,
}) => {
  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </Link>

        <Link
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>

        <Link
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
                key={century}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  {
                    'is-info': centuries.includes(century),
                  },
                )}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{
                search: getSearchWith(searchParams, { centuries: null }),
              }}
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-outlined',
                'is-success',
                {
                  'is-success': !centuries.length,
                },
              )}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(
              searchParams,
              {
                query: null,
                sex: null,
                centuries: null,
              },
            ),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
