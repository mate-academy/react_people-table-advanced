import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { CenturyLink } from './CenturyLink';
import { SexLink } from './sexLink';
import { Filter } from '../types/Filter';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexLink sex={Filter.ALL} />
        <SexLink sex={Filter.MALE} />
        <SexLink sex={Filter.FEMALE} />
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              const newSearchParams = new URLSearchParams(searchParams
                .toString());

              newSearchParams.set('query', event.target.value);

              setSearchParams(newSearchParams);
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
            <CenturyLink century="16" />
            <CenturyLink century="17" />
            <CenturyLink century="18" />
            <CenturyLink century="19" />
            <CenturyLink century="20" />
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                { 'is-success is-outlined': centuries.length === 0 },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
