import React from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { SelectedSex } from '../types';
import { allCentury } from '../utils/constants';

type PeopleFiltersProps = {
  query: string,
  sex: string,
  centuries: string[],
  handleSex: (newSex: string) => void,
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  query,
  sex,
  centuries,
  handleSex,
  handleQueryChange,
}) => {
  function toggleCentury(century: string) {
    return centuries.includes(century)
      ? centuries.filter(num => num !== century)
      : [...centuries, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: SelectedSex.ALL }}
          className={cn({
            'is-active': sex === SelectedSex.ALL,
          })}
          onClick={() => {
            handleSex(SelectedSex.ALL);
          }}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: SelectedSex.MALE }}
          className={cn({
            'is-active': sex === SelectedSex.MALE,
          })}
          onClick={() => {
            handleSex(SelectedSex.MALE);
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: SelectedSex.FEMALE }}
          className={cn({
            'is-active': sex === SelectedSex.FEMALE,
          })}
          onClick={() => {
            handleSex(SelectedSex.FEMALE);
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
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {allCentury.map(century => (
              <SearchLink
                key={century}
                params={{ centuries: toggleCentury(century) }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ centuries: null, query: null, sex: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
