import React from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const centuriess = ['16', '17', '18', '19', '20'];

export enum SexType {
  male = 'm',
  female = 'f',
  all = 'all',
}

type Props = {
  query: string,
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  centuries: string[],
  sex: string,
  handleSexChange: (sex: string) => void,
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  handleQueryChange,
  centuries,
  sex,
  handleSexChange,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === '' })}
          params={{ sex: null }}
          onClick={() => handleSexChange(SexType.all)}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === SexType.male })}
          params={{ sex: SexType.male }}
          onClick={() => handleSexChange(SexType.male)}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === SexType.female })}
          params={{ sex: SexType.female }}
          onClick={() => handleSexChange(SexType.female)}
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
            {centuriess.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1',
                  { 'is-info': centuries.includes(century) })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(ch => ch !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              className="button is-link is-outlined is-fullwidth"
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
