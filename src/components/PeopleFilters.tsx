import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const activeCenturies = searchParams.getAll('centuries');

  const handleCenturies = (century: string) => {
    if (activeCenturies.includes(century)) {
      return activeCenturies.filter(activeCentury => activeCentury !== century);
    }

    return [...activeCenturies, century];
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    const querySearch = event.target.value.trim();

    if (querySearch === '') {
      setSearchParams(getSearchWith(searchParams, { query: null }));

      return;
    }

    setSearchParams(getSearchWith(searchParams, { query: querySearch }));
  };

  useEffect(() => {
    const queryFromUrl = searchParams.get('query') || '';

    setQuery(queryFromUrl);
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !searchParams.has('sex'),
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
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
            onChange={handleQuery}
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
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('16'),
              })}
              params={{ centuries: handleCenturies('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('17'),
              })}
              params={{ centuries: handleCenturies('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('18'),
              })}
              params={{ centuries: handleCenturies('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('19'),
              })}
              params={{ centuries: handleCenturies('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': activeCenturies.includes('20'),
              })}
              params={{ centuries: handleCenturies('20') }}
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
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
