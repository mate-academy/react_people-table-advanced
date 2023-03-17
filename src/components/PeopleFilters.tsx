import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { CenturyLink } from './CenturyLink';
import { SexLink } from './sexLink';
import { Filter } from '../types/Filter';
import { SearchLink } from './SearchLink';

type PeopleFilterProps = {
  setQuery: (event: string) => void
  query: string
  baseCenturies: number[]
};

export const PeopleFilters: React.FC<PeopleFilterProps> = ({
  setQuery,
  query,
  baseCenturies,
}) => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
              setQuery(event.target.value);
            }}
            ref={inputRef}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {baseCenturies.map((century) => (
              <CenturyLink century={century} />
            ))}
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
