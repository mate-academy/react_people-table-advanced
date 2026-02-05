import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const CENTURIES = ['16', '17', '18', '19', '20'];

  const handleResetAll = () => {
    setSearchParams({});
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    setSearchParams(
      getSearchWith(searchParams, {
        query: value || null,
      }),
    );
  };

  const handleCenturiesChange = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    const newCenturies = currentCenturies.includes(century)
      ? currentCenturies.filter(current => current !== century)
      : [...currentCenturies, century];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length ? newCenturies : null,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
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
            value={query}
            onChange={handleQuery}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
                href="#/people"
                onClick={event => {
                  event.preventDefault();
                  handleCenturiesChange(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={event => {
                event.preventDefault();
                setSearchParams(
                  getSearchWith(searchParams, {
                    centuries: null,
                  }),
                );
              }}
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
          onClick={event => {
            event.preventDefault();
            handleResetAll();
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
