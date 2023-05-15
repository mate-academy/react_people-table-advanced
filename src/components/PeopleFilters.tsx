import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  searchParams: URLSearchParams
  centuries: string[]
  query: string
  sex: string
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  centuries,
  query,
  sex,
  onQueryChange,
}) => {
  const centuriesArray = ['16', '17', '18', '19', '20'];

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
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            defaultValue={query}
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map(centurie => (
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(centurie)
                      ? centuries.filter(c => c !== centurie)
                      : [...centuries, centurie],
                  }),
                }}
                key={centurie}
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(centurie) },
                )}
              >
                {centurie}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(searchParams, {
              centuries: null,
              sex: null,
              query: null,
            }),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
