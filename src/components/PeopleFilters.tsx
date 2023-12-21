/* eslint-disable no-restricted-syntax */
import React from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter } from '../types/Filter';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const centuriesValues = [16, 17, 18, 19, 20];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get(Filter.SEX);
  const name = searchParams.get(Filter.NAME) || '';
  const centuries = searchParams.getAll('centuries');

  const resetParams = () => {
    const newSearchParams = new URLSearchParams('');

    return newSearchParams.toString();
  };

  function setParams(params: SearchParams) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setParams({ query: e.currentTarget.value || null });
    searchParams.set(Filter.NAME, e.target.value);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
        >
          All
        </Link>

        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
        >
          Male
        </Link>

        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
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
            value={name}
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

            {centuriesValues.map(number => (
              <Link
                data-cy="century"
                key={number}
                className={classNames('button mr-1', {
                  'is-info': centuries?.includes(String(number)),
                })}
                to={{
                  search: getSearchWith({
                    centuries: centuries.includes(String(number))
                      ? centuries.filter(num => String(number) !== num)
                      : [...centuries, String(number)],
                  }, searchParams),
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
              to={{ search: getSearchWith({ centuries: null }, searchParams) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: resetParams() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
