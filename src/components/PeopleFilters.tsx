import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  sex: string | null,
}

export const PeopleFilters: React.FC<Props> = ({
  sex,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string | null>(null);
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !sex })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'm' })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({ 'is-active': sex === 'f' })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSearchParams(
                getSearchWith(searchParams,
                  { query: event.target.value || null }),
              );
            }}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                data-cy="century"
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                to={
                  {
                    search: getSearchWith(searchParams, {
                      centuries: centuries.includes(century)
                        ? centuries.filter(cent => cent !== century)
                        : [...centuries, century],
                    }),
                  }
                }
                key={century}
              >
                {century}
              </Link>
            ))}

          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
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
          onClick={() => setQuery('')}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
