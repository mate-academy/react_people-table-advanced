import React from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { Gender } from '../types/FilterParams';

const centuriesForFilter = ['16', '17', '18', '19', '20'];

type Props = {
  query: string;
  centuries: string[];
  sex: Gender;
  handleQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSex: (sex: Gender) => void;
};

export const PeopleFilters: React.FC<Props> = ({
  centuries,
  query,
  sex,
  handleQuery,
  handleSex,
}) => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <p className="panel-tabs" data-cy="SexFilter">
      <SearchLink
        params={{ sex: null }}
        onClick={() => handleSex(Gender.All)}
        className={cn({ 'is-active': sex === Gender.All })}
      >
        All
      </SearchLink>
      <SearchLink
        params={{ sex: Gender.Male }}
        onClick={() => handleSex(Gender.Male)}
        className={cn({ 'is-active': sex === Gender.Male })}
      >
        Male
      </SearchLink>
      <SearchLink
        params={{ sex: Gender.Female }}
        onClick={() => handleSex(Gender.Female)}
        className={cn({ 'is-active': sex === Gender.Female })}
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
          onChange={handleQuery}
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
              params={{
                centuries: centuries.includes(century)
                  ? centuries.filter(item => item !== century)
                  : [...centuries, century],
              }}
              key={century}
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuries.includes(century),
              })}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className="button is-success is-outlined"
            params={{
              centuries: null,
            }}
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
