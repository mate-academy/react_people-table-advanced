import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];

  function toggleCentury(century: string) {
    return centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];
  }

  function deleteCentury() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  const renderCenturyLink = (century: string) => (
    <SearchLink
      key={century}
      data-cy="century"
      className={classNames(
        'button mr-1', { 'is-info': centuries.includes(century) },
      )}
      params={{ centuries: toggleCentury(century) }}
    >
      {century}
    </SearchLink>
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !searchParams.get('sex') })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames(
            { 'is-active': searchParams.get('sex') === 'm' },
          )}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames(
            { 'is-active': searchParams.get('sex') === 'f' },
          )}
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
            onChange={(event) => {
              const params = getSearchWith(
                searchParams, { query: event.target.value || null },
              );

              setSearchParams(params);
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
            {Array.from(
              { length: 5 },
              (_, index) => renderCenturyLink(String(index + 16)),
            )}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button mr-1',
                { 'is-success': !searchParams.get('centuries') },
              )}
              params={{ centuries: [] }}
              onClick={() => deleteCentury}
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
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
