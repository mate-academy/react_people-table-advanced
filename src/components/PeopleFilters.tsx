import React from 'react';
import classNames from 'classnames';
import { SexFilter } from '../types/SexFilter';
import { SearchLink } from './SearchLink';

type Props = {
  sex: string,
  query: string,
  centuries: string[],
  handleQuery: (query: React.ChangeEvent<HTMLInputElement>) => void,
  handleSexFilter: (sex: SexFilter) => void,
};

const centuriesForFilter = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  sex,
  query,
  centuries,
  handleQuery,
  handleSexFilter,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': sex === SexFilter.All,
          })}
          params={{ sex: null }}
          onClick={() => handleSexFilter(SexFilter.All)}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === SexFilter.Male,
          })}
          params={{ sex: SexFilter.Male }}
          onClick={() => SexFilter.Male}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': sex === SexFilter.Female,
          })}
          params={{ sex: SexFilter.Female }}
          onClick={() => SexFilter.Female}
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
            onChange={handleQuery}
            value={query}
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
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(item => item !== century)
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
                'is-outlined': !!centuries.length,
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
          params={{
            centuries: null,
            query: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
