import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SexFilter } from '../types';

const numbers = ['16', '17', '18', '19', '20'];

type Props = {};

export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setSearchWith(params: any) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: e.target.value || null });
  }

  function toggleNumbers(number: string) {
    const newNumbers = centuries.includes(number)
      ? centuries.filter(c => c !== number)
      : [...centuries, number];

    return newNumbers;
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!sex ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={sex === SexFilter.MALE ? 'is-active' : ''}
          to={{ search: getSearchWith(searchParams, { sex: SexFilter.MALE }) }}
        >
          Male
        </Link>
        <Link
          className={sex === SexFilter.FEMALE ? 'is-active' : ''}
          to={{
            search: getSearchWith(searchParams, { sex: SexFilter.FEMALE }),
          }}
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
            {numbers.map(number => (
              <Link
                key={number}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(number),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: toggleNumbers(number),
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
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
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
              centuries: null,
              query: null,
              sex: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
