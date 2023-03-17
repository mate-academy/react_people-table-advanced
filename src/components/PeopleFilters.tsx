/* eslint-disable no-console */
import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// move to Utils

// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(callback: Function, delay: number) {
  let timerId = 0;

  return (...args: unknown[]) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const placeholderCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState(
    searchParams.get('query') || '',
  );

  const queryWrapper = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  useEffect(() => {
    switch (appliedQuery.length) {
      case 0:
        searchParams.delete('query');
        break;
      default:
        searchParams.set('query', appliedQuery);
    }

    setSearchParams(searchParams);
  }, [appliedQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
    queryWrapper(value);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">All</a>
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
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
            {placeholderCenturies.map(century => {
              const centuries = searchParams.getAll('century');
              const hasCentury = centuries.includes(century);

              const getSearch = () => {
                const newSearchParams = new URLSearchParams(searchParams
                  .toString());
                const newCenturies = hasCentury
                  ? centuries.filter((newCentury) => newCentury !== century)
                  : [...centuries, century];

                newSearchParams.delete('century');

                newCenturies.forEach((singleCentury) => {
                  newSearchParams.append('century', singleCentury);
                });

                return newSearchParams.toString();
              };

              return (
                <Link
                  data-cy="century"
                  className={cn(
                    'button mr-1',
                    { 'is-info': centuries.includes(century) },
                  )}
                  to={{ search: getSearch() }}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
