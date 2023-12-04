import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FilterParams } from '../types';

const filterCenturies = [16, 17, 18, 19, 20];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll(FilterParams.CENTURIES) || [];
  const defaultQuery = searchParams.get(FilterParams.NAME) || '';
  const [query, setQuery] = useState(defaultQuery);

  const getParams = (key: FilterParams, value = '') => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      if (key === FilterParams.CENTURIES) {
        const newCenturies = centuries.includes(value)
          ? centuries.filter(century => century !== value)
          : [...centuries, value];

        params.delete(FilterParams.CENTURIES);

        newCenturies.forEach(century => {
          params.append(FilterParams.CENTURIES, century);
        });
      } else {
        params.set(key, value.trim());
      }
    } else {
      params.delete(key);
    }

    return params.toString();
  };

  const getResetParams = () => {
    const params = new URLSearchParams(searchParams);

    params.delete(FilterParams.NAME);
    params.delete(FilterParams.SEX);
    params.delete(FilterParams.CENTURIES);

    return params.toString();
  };

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
    setSearchParams(getParams(FilterParams.NAME, e.currentTarget.value));
  };

  useEffect(() => {
    if (!defaultQuery) {
      setQuery('');
    }
  }, [defaultQuery]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getParams(FilterParams.SEX) }}
          className={classNames({
            'is-active': !searchParams.has(FilterParams.SEX),
          })}
        >
          All
        </Link>
        <Link
          to={{ search: getParams(FilterParams.SEX, 'm') }}
          className={classNames({
            'is-active': searchParams.get(FilterParams.SEX) === 'm',
          })}
        >
          Male
        </Link>
        <Link
          to={{ search: getParams(FilterParams.SEX, 'f') }}
          className={classNames({
            'is-active': searchParams.get(FilterParams.SEX) === 'f',
          })}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {filterCenturies.map(century => (
              <Link
                to={{
                  search: getParams(FilterParams.CENTURIES, String(century)),
                }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(String(century)),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{ search: getParams(FilterParams.CENTURIES) }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!centuries.length,
              })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{ search: getResetParams() }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
