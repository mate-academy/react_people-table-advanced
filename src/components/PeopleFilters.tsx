import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') || '';
  const currentSexFilter = searchParams.get('sex') || '';
  const currentCenturies = searchParams.getAll('centuries');

  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    let queryValue: null | string = query;

    if (query === '') {
      queryValue = null;
    }

    const newParams = getSearchWith(searchParams, { query: queryValue });

    setSearchParams(newParams);
  }, [query, searchParams, setSearchParams, currentQuery]);

  const isSexFilterSelected = (param: string) => {
    return currentSexFilter === param;
  };

  const isCenturySelected = (param: string) => {
    return currentCenturies.includes(param);
  };

  const isNoneCenturySelected = () => {
    return currentCenturies.length === 0;
  };

  enum SexFilter {
    All = '',
    Male = 'm',
    Female = 'f',
  }

  const CENTURIES = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilter).map(([key, value]) => {
          return (
            <SearchLink
              params={{ sex: value === '' ? null : value }}
              className={isSexFilterSelected(value) ? 'is-active' : ''}
              key={key}
            >
              {key}
            </SearchLink>
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
            onChange={event => {
              setQuery(event.target.value);
            }}
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
              const addCentury = () => {
                return [...currentCenturies, century];
              };

              const removeCentury = () => {
                return currentCenturies.filter(cen => cen !== century);
              };

              return (
                <SearchLink
                  params={{
                    centuries: isCenturySelected(century)
                      ? removeCentury()
                      : addCentury(),
                  }}
                  className={classNames('button', 'mr-1', {
                    'is-info': isCenturySelected(century),
                  })}
                  key={century}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{
                centuries: [],
              }}
              className={classNames('button', 'is-success', {
                'is-outlined': !isNoneCenturySelected(),
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: [] }}
          onClick={() => {
            setQuery('');
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
