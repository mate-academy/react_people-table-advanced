/* eslint-disable @typescript-eslint/indent */
import React, { ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';
import { centuries } from './types';
import { SexRoutesFilter } from './types';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuriesSearch = searchParams.getAll('centuries') || [];
  const searchInput = searchParams.getAll('search') || '';

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        search: e.target.value.toLocaleLowerCase() || null,
      }),
    );
  };

  const getIconClass = (filterType: SexRoutesFilter) => {
    const currentSort = searchParams.get('sex');

    if (currentSort === filterType) {
      return 'is-active';
    } else if (!currentSort && filterType === SexRoutesFilter.All) {
      return 'is-active';
    } else {
      return '';
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexRoutesFilter).map(([title, path]) => (
          <Link
            key={title}
            to={{ search: getSearchWith(searchParams, { sex: path || null }) }}
            className={classNames(getIconClass(path))}
          >
            {title}
          </Link>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchInput}
            onChange={handleInput}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(item => {
              const normalizedIttem = item.toString();

              return (
                <Link
                  key={item}
                  data-cy="century"
                  to={{
                    search: getSearchWith(searchParams, {
                      centuries: centuriesSearch.includes(normalizedIttem)
                        ? centuriesSearch.filter(
                            cent => normalizedIttem !== cent,
                          )
                        : [...centuriesSearch, normalizedIttem],
                    }),
                  }}
                  className={classNames('button mr-1', {
                    'is-info': centuriesSearch.includes(normalizedIttem),
                  })}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuriesSearch.length,
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
          to={{
            search: getSearchWith(searchParams, {
              sex: null,
              centuries: null,
              search: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
