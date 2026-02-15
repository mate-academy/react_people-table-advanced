import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchParams(
      getSearchWith(searchParams, {
        query: value || null,
      }),
    );
  };

  function toggleCentury(ch: string) {
    const nextCenturies = centuries.includes(ch)
      ? centuries.filter(c => c !== ch)
      : [...centuries, ch];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: nextCenturies.length ? nextCenturies : null,
      }),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': sex === null })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            {['16', '17', '18', '19', '20'].map(c => (
              <button
                key={c}
                type="button"
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(c),
                })}
                onClick={() => toggleCentury(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuries.length > 0,
              })}
              onClick={() =>
                setSearchParams(
                  getSearchWith(searchParams, { centuries: null }),
                )
              }
            >
              All
            </button>
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
