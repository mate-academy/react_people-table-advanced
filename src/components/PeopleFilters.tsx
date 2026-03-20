import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
// import { getSearchWith } from './PeoplePage';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();

  useEffect(() => {
    const q = searchParams.get('query') ?? '';

    setInputValue(q);
  }, [searchParams]);

  const addCentury = (c: number) => {
    const existing = searchParams.getAll('centuries');
    const next = existing.includes(String(c))
      ? [...existing].filter(centr => centr !== String(c))
      : [...existing, String(c)];

    return getSearchWith({ centuries: next }, searchParams);
  };

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);

    if (!event.target.value) {
      setSearchParams(getSearchWith({ query: null }, searchParams));
    } else {
      const newParams = getSearchWith(
        { query: event.target.value },
        searchParams,
      );

      setSearchParams(newParams);
    }
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn(!searchParams.has('sex') ? 'is-active' : '')}
          to={{
            pathname: location.pathname,
            search: getSearchWith({ sex: null }, searchParams),
          }}
        >
          All
        </Link>
        <Link
          className={cn(searchParams.get('sex') === 'm' ? 'is-active' : '')}
          to={{
            pathname: location.pathname,
            search: getSearchWith({ sex: 'm' }, searchParams),
          }}
        >
          Male
        </Link>
        <Link
          className={cn(searchParams.get('sex') === 'f' ? 'is-active' : '')}
          to={{
            pathname: location.pathname,
            search: getSearchWith({ sex: 'f' }, searchParams),
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
            value={inputValue}
            onChange={event => handleInput(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <Link
              data-cy="century"
              className={cn(
                'button mr-1',
                searchParams.getAll('centuries').includes('16')
                  ? 'is-info'
                  : '',
              )}
              to={{
                pathname: location.pathname,
                search: addCentury(16),
              }}
            >
              16
            </Link>

            <Link
              data-cy="century"
              className={cn(
                'button mr-1',
                searchParams.getAll('centuries').includes('17')
                  ? 'is-info'
                  : '',
              )}
              to={{
                pathname: location.pathname,
                search: addCentury(17),
              }}
            >
              17
            </Link>

            <Link
              data-cy="century"
              className={cn(
                'button mr-1',
                searchParams.getAll('centuries').includes('18')
                  ? 'is-info'
                  : '',
              )}
              to={{
                pathname: location.pathname,
                search: addCentury(18),
              }}
            >
              18
            </Link>

            <Link
              data-cy="century"
              className={cn(
                'button mr-1',
                searchParams.getAll('centuries').includes('19')
                  ? 'is-info'
                  : '',
              )}
              to={{
                pathname: location.pathname,
                search: addCentury(19),
              }}
            >
              19
            </Link>

            <Link
              data-cy="century"
              className={cn(
                'button mr-1',
                searchParams.getAll('centuries').includes('20')
                  ? 'is-info'
                  : '',
              )}
              to={{
                pathname: location.pathname,
                search: addCentury(20),
              }}
            >
              20
            </Link>
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname: location.pathname,
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
          className="button is-link is-outlined is-fullwidth"
          to={{
            pathname: location.pathname,
            search: getSearchWith(
              {
                centuries: null,
                query: null,
                sex: null,
              },
              searchParams,
            ),
          }}
          onClick={() => setInputValue('')}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
