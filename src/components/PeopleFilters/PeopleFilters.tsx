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
            <SearchLink
              data-cy="century"
              className={getCenturiesClass('16')}
              params={{ centuries: toggleCentury('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturiesClass('17')}
              params={{ centuries: toggleCentury('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturiesClass('18')}
              params={{ centuries: toggleCentury('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturiesClass('19')}
              params={{ centuries: toggleCentury('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={getCenturiesClass('20')}
              params={{ centuries: toggleCentury('20') }}
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
            sex: null,
            centuries: null,
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
