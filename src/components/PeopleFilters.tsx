import { Link, useSearchParams } from 'react-router-dom';
import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = (searchParams.get('sex') as Person['sex']) || '';

  const setSearchWith = (param: SearchParams) => {
    const search = getSearchWith(searchParams, param);

    setSearchParams(search);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value });
  };

  function toggleCenturies(century: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(century)
      ? centuries.filter(year => year !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(year => params.append('centuries', year));
    setSearchParams(params);
  }

  const toggleAllCenturies = () => {
    setSearchParams({ centuries: [] });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === 'm',
          })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({
            'is-active': sex === 'f',
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={`/people?centuries=${century}`}
                onClick={e => {
                  e.preventDefault();
                  toggleCenturies(century);
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${centuries.length !== 0 ? 'is-outlined' : ''}`}
              onClick={toggleAllCenturies}
              href="#/people"
            >
              All
            </a>
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
