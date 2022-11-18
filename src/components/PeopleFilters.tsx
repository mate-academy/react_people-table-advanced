import classNames from 'classnames';
import React, { FC } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

type Props = {
  searchParams: URLSearchParams,
  setSearchParams: (value: string) => void,
  sex: string,
  query: string,
  centuries: string[],
};

export const PeopleFilters: FC<Props> = ({
  searchParams, setSearchParams, sex, query, centuries,
}) => {
  const centuryArray = ['16', '17', '18', '19', '20'];

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            { 'is-active': sex === '' },
          )}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
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
            onChange={onNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryArray.map(century => (
              <SearchLink
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(
                      clickCentery => clickCentery !== century,
                    )
                    : [...centuries, century],
                }}
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1',
                  { 'is-info': centuries.includes(century) })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': centuries.length > 0 })}
              params={{ centuries: null }}
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
