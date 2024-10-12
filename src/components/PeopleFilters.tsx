import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { SexFilter } from '../types';
import { getSearchWith } from '../utils/getSearchWith';

type Props = {};

const sexParams = [
  { sortBy: SexFilter.All },
  { sortBy: SexFilter.Male },
  { sortBy: SexFilter.Female },
];

const centuriesParams = [
  { sortBy: '16' },
  { sortBy: '17' },
  { sortBy: '18' },
  { sortBy: '19' },
  { sortBy: '20' },
];

export const PeopleFilters: React.FC<Props> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || SexFilter.All;
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(
      { query: e.target.value || null },
      searchParams,
    );

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexParams.map((param, i) => {
          return (
            <Link
              key={param.sortBy}
              className={cn({
                'is-active': sex === param.sortBy,
              })}
              to={{
                search: getSearchWith(
                  { sex: param.sortBy || null },
                  searchParams,
                ),
              }}
            >
              {Object.keys(SexFilter)[i]}
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
            {centuriesParams.map(c => (
              <Link
                key={c.sortBy}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(c.sortBy),
                })}
                to={{
                  search: getSearchWith(
                    {
                      centuries: centuries.includes(c.sortBy)
                        ? centuries.filter(cent => cent !== c.sortBy)
                        : [...centuries, c.sortBy],
                    },
                    searchParams,
                  ),
                }}
              >
                {c.sortBy}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{
                search: getSearchWith({ centuries: null }, searchParams),
              }}
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
              {
                centuries: null,
                query: null,
                sex: null,
              },
              searchParams,
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
