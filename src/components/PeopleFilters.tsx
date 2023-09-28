/* eslint-disable no-console */
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { Sex } from '../types/Sex';

const CENTURIES: number[] = [16, 17, 18, 19, 20];

export const PeopleFilters = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const gender = searchParams.get('sex') || Sex.All;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const getPeopleByGender = (sex: string) => {
    const params = new URLSearchParams(searchParams);

    switch (sex) {
      case Sex.Male: {
        params.set('sex', 'm');

        return params.toString();
      }

      case Sex.Female:
        params.set('sex', 'f');

        return params.toString();

      default:
        params.delete('sex');

        return params.toString();
    }
  };

  const getPeopleBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const searchValue = event.currentTarget.value;

    if (params.has('query') && !searchValue) {
      params.delete('query');
      setSearchParams(params);

      return;
    }

    params.set('query', searchValue);
    setSearchParams(params);
  };

  const getPeopleByCenturies = (century?: string) => {
    const params = new URLSearchParams(searchParams);

    if (!century) {
      params.delete('centuries');

      return params.toString();
    }

    const newCenturies = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(year => {
      params.append('centuries', year);
    });

    return params.toString();
  };

  const resetAllFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    params.delete('sex');
    params.delete('query');

    return params.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getPeopleByGender(Sex.All) }}
          className={cn({
            'is-active': gender === Sex.All,
          })}
        >
          All
        </Link>
        <Link
          to={{ search: getPeopleByGender(Sex.Male) }}
          className={cn({
            'is-active': gender === 'm',
          })}
        >
          Male
        </Link>
        <Link
          to={{ search: getPeopleByGender(Sex.Female) }}
          className={cn({
            'is-active': gender === 'f',
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
            onChange={getPeopleBySearch}
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
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={{ search: getPeopleByCenturies(century.toString()) }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success is-outlined', {
                'is-hovered': !centuries.length,
              })}
              to={{ search: getPeopleByCenturies() }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: resetAllFilters() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
});
