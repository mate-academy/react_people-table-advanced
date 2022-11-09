import React from 'react';
import { Link, URLSearchParamsInit } from 'react-router-dom';
import classNames from 'classnames';

import { getSearchWith } from '../utils/searchHelper';

import { Person } from '../types/Person';

type SexLinkProps = {
  searchParams: URLSearchParams
  sex: string
  text: string
  to: string
};

const SexLink: React.FC<SexLinkProps> = ({
  searchParams,
  sex,
  text,
  to,
}) => (
  <Link
    className={classNames({ 'is-active': sex === to })}
    to={{ search: getSearchWith(searchParams, { sex: to || null }) }}
  >
    {text}
  </Link>
);

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (param: URLSearchParamsInit) => void;
  persons: Person[] | null
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  persons,
}) => {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const centurieBorn = new Set(persons?.map(person => `${Math.ceil(person.born / 100)}`));

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexLink
          searchParams={searchParams}
          sex={sex}
          text="All"
          to=""
        />

        <SexLink
          searchParams={searchParams}
          sex={sex}
          text="Male"
          to="m"
        />

        <SexLink
          searchParams={searchParams}
          sex={sex}
          text="Female"
          to="f"
        />
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={(e) => {
              setSearchParams(getSearchWith(
                searchParams,
                { query: e.target.value || null },
              ));
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
            {Array.from(centurieBorn).sort().map(centurie => {
              return (
                <Link
                  key={centurie}
                  data-cy="century"
                  className={classNames(
                    'button mr-1',
                    { 'is-info': centuries.includes(centurie) },
                  )}
                  to={{
                    search: getSearchWith(
                      searchParams,
                      {
                        centuries: centuries.includes(centurie)
                          ? [...centuries.filter(centuriesItem => {
                            return centuriesItem !== centurie;
                          })]
                          : [...centuries, centurie],
                      },
                    ),
                  }}
                >
                  {centurie}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames(
                'button',
                { 'is-success': centuries.length === 0 },
                { 'is-outlined': centuries.length !== 0 },
              )}
              to={{
                search: getSearchWith(
                  searchParams,
                  { centuries: [] },
                ),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
