import { useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { avalibleCenturies } from '../utils/variables';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  if (avalibleCenturies.length === centuries.length) {
    setSearchParams(
      getSearchWith(searchParams, { centuries: [] }),
    );
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': !sex,
          })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === 'm',
          })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === 'f',
          })}
          params={{
            sex: 'f',
          }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={event => handleQueryChange(event)}
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
            {avalibleCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(currentCentury => (
                      currentCentury !== century
                    ))
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              params={{
                centuries: null,
              }}
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
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
