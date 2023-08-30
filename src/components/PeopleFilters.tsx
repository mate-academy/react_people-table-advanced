import classNames from 'classnames';
import { useCallback } from 'react';
import { SearchLink } from './SearchLink';
import { usePeopleContext } from '../context.ts/PeopleContext';

export const PeopleFilters = () => {
  const {
    centuries, handleQuery, query, gender, setQuery,
  } = usePeopleContext();

  const getCenturies = useCallback((age: string) => {
    return centuries.includes(age)
      ? centuries.filter(centur => centur !== age)
      : centuries.concat([age]);
  }, [centuries]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': gender === '' })}
          params={{ sex: null }}
        >
          All

        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': gender === 'm' })}
          params={{ sex: 'm' }}
        >
          Male

        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': gender === 'f' })}
          params={{ sex: 'f' }}
        >
          Female

        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">

          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => handleQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={centuries.includes('16')
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              params={{
                centuries: getCenturies('16'),
              }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={centuries.includes('17')
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              params={{
                centuries: getCenturies('17'),
              }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={centuries.includes('18')
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              params={{
                centuries: getCenturies('18'),
              }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={centuries.includes('19')
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              params={{
                centuries: getCenturies('19'),
              }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={centuries.includes('20')
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              params={{
                centuries: getCenturies('20'),
              }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
          onClick={() => setQuery('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
