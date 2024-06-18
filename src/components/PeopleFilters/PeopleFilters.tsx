/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';

enum SexFilter {
  Male = 'm',
  Female = 'f',
  All = 'all',
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterSex = searchParams.get('sex');
  const [query, setQuery] = useState('');
  const centuries = searchParams.getAll('centuries');
  const centuriesAvailable = ['16', '17', '18', '19', '20'];

  const toggleCentury = (century: string) => {
    if (centuries.includes(century)) {
      return centuries.filter(cen => cen !== century);
    } else {
      return [...centuries, century];
    }
  };

  const getCenturiesClass = (century: string) => {
    return classNames('button mr-1', {
      'is-info': centuries.includes(century),
    });
  };

  const resetQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    if (!query.length) {
      searchParams.delete('query');

      setSearchParams(searchParams.toString());
    } else {
      searchParams.set('query', query);

      setSearchParams(searchParams.toString());
    }
  }, [query]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !filterSex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': filterSex === SexFilter.Male })}
          params={{ sex: SexFilter.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': filterSex === SexFilter.Female,
          })}
          params={{ sex: SexFilter.Female }}
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
            onChange={e => setQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesAvailable.map(cent => (
              <SearchLink
                data-cy="century"
                className={getCenturiesClass(cent)}
                params={{ centuries: toggleCentury(cent) }}
                key={+cent}
              >
                {cent}
              </SearchLink>
            ))}
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
            sex: null,
            centuries: null,
            query: null,
          }}
          onClick={resetQuery}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
