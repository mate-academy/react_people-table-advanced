import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import {
  DEFAULT_CENTURIES,
  DEFAULT_QUERY,
  DEFAULT_SEX,
  Filters,
  availableCenturies,
} from '../utils/vars';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || DEFAULT_CENTURIES;
  const query = searchParams.get('query') || DEFAULT_QUERY;
  const sex = searchParams.get('sex') || DEFAULT_SEX;

  const setSearchWith = (params: { query: string }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Filters).map(value => {
          return (
            <Link
              className={classNames('is-capitalized', {
                'is-active': sex === value,
              })}
              to={{
                search: getSearchWith(searchParams, {
                  sex: value === 'all' ? null : value[0],
                }),
              }}
              key={value}
            >
              {value}
            </Link>
          );
        })}
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
            {availableCenturies.map((century) => {
              const preparedCentury = century.toString();
              const searchQuery = getSearchWith(searchParams, {
                centuries: centuries.includes(preparedCentury)
                  ? centuries.filter(ch => preparedCentury !== ch)
                  : [...centuries, preparedCentury],
              });

              return (
                <React.Fragment key={century}>
                  <Link
                    data-cy="century"
                    className={classNames('button', 'mr-1', {
                      'is-info': centuries.includes(century.toString()),
                    })}
                    to={{ search: searchQuery }}
                  >
                    {century}
                  </Link>
                </React.Fragment>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', 'is-success',
                { 'is-outlined': centuries.length })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: [],
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
