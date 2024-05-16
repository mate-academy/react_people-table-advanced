import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const appliedQuery = e.target.value.trim() ? e.target.value : null;
    const appliedSearch = getSearchWith(searchParams, { query: appliedQuery });

    setSearchParams(appliedSearch, { replace: true });
  };

  const toggleCenturies = (century: string) =>
    centuries.includes(century)
      ? centuries.filter(el => el != century)
      : [...centuries, century];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="sex">
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
        <div className="level is-flex-grow-1 is-mobile" data-cy="centuries">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: toggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button mr-1 is-success', {
                'is-outlined': centuries.length,
              })}
              params={{ centuries: [] }}
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
            query: null,
            sex: null,
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
