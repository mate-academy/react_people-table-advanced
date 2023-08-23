import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink/SearchLink';
import { Sex } from '../../types';

type Props = {
  sex: Sex | null;
  query: string | null;
  centuries: string[];
};

const centuriesForFilter = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({ sex, query, centuries }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isNotCurrentCentury = (c: string, century: string) => c !== century;

  const onQueryChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classnames({ 'is-active': sex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classnames({ 'is-active': sex === Sex.MALE })}
          params={{ sex: Sex.MALE }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classnames({ 'is-active': sex === Sex.FEMALE })}
          params={{ sex: Sex.FEMALE }}
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
            defaultValue={query || ''}
            onChange={onQueryChage}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesForFilter.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classnames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => isNotCurrentCentury(c, century))
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
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
