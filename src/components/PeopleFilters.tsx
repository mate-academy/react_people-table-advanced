import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type SearchParamsToUpdate = Record<string, string | string[] | null>;

export const getSearchWith = (
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParamsToUpdate,
): string => {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === '') {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(v => newParams.append(key, v));
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
};

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const newSearch = getSearchWith(searchParams, {
      query: newQuery.trim() ? newQuery : null,
    });

    setSearchParams(newSearch);
  };

  const getCenturySearch = (century: string) => {
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(c => c !== century)
      : [...selectedCenturies, century];

    return getSearchWith(searchParams, {
      centuries: newCenturies.length > 0 ? newCenturies : null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          className={classNames({ 'is-active': !selectedSex })}
        >
          All
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
          className={classNames({ 'is-active': selectedSex === 'm' })}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
          className={classNames({ 'is-active': selectedSex === 'f' })}
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
            {CENTURIES.map(century => {
              const isActive = selectedCenturies.includes(century);

              return (
                <Link
                  key={century}
                  data-cy="century"
                  to={{ search: getCenturySearch(century) }}
                  className={classNames('button mr-1', {
                    'is-info': isActive,
                  })}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              to={{
                search: getSearchWith(searchParams, { centuries: null }),
              }}
              className={classNames('button is-success', {
                'is-outlined': selectedCenturies.length > 0,
              })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              query: null,
              sex: null,
              centuries: null,
            }),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
