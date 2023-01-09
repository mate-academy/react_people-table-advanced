import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const sexFilters = ['All', 'Male', 'Female'];
const centuriesArr = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || 'All';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const resetAllParams = {
    sex: null,
    query: null,
    centuries: [],
    sort: null,
    order: null,
  };

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const booleanValue = centuriesArr.every(item => centuries.includes(item));

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilters.map(sexFilter => (
          <SearchLink
            key={sexFilter}
            params={({ sex: sexFilter === 'All' ? null : sexFilter })}
            className={classNames({
              'is-active': sex === sexFilter,
            })}
          >
            {sexFilter}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => changeQuery(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArr.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(item => item !== century)
                    : [...centuries, century],
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{
                centuries: booleanValue
                  ? []
                  : [...centuriesArr],
              }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={resetAllParams}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
