import classNames from 'classnames';
import React from 'react';
import { SearchLink } from '../SearchLink/SearchLink';
import { Sex } from '../../types/Sex';

const centuriesArray = [16, 17, 18, 19, 20];

interface Props {
  query: string,
  centuries: string[],
  sex: string,
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export const PeopleFilters: React.FC<Props> = ({
  query,
  centuries,
  sex,
  handleQueryChange,
}) => {
  const toggleCentury = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter((centuryElem) => centuryElem !== century)
      : [...centuries, century];

    return newCenturies;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames(
            { 'is-active': sex === Sex.ALL },
          )}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.MALE }}
          className={classNames(
            { 'is-active': sex === Sex.MALE },
          )}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.FEMALE }}
          className={classNames(
            { 'is-active': sex === Sex.FEMALE },
          )}
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
            {centuriesArray.map(century => (
              <SearchLink
                params={{ centuries: toggleCentury(century.toString()) }}
                data-cy="century"
                key={century}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
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
              className={classNames('button is-success', {
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
