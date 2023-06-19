import classNames from 'classnames';
import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from '../../types/Filter';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

type Props = {
  query: string,
  sex: string | null,
  centuries: string[],
};

export const PeopleFilters: FC<Props> = ({
  query,
  sex,
  centuries,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuryList = ['16', '17', '18', '19', '20'];

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
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': Filter.Male === sex })}
          params={{ sex: Filter.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': Filter.Female === sex })}
          params={{ sex: Filter.Female }}
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
            {centuryList.map(century => (
              <SearchLink
                key={century}
                className={classNames('button mr-1',
                  {
                    'is-info': centuries.includes(century),
                  })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(el => el !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryAll"
              className={classNames('button is-success',
                {
                  'is-outlined': centuries.length !== 0,
                })}
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
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
