import classNames from 'classnames';
import React from 'react';
import { Sex } from '../types/FilterOptions';
import { SearchLink } from './SearchLink';

const centuriesToSelect = ['16', '17', '18', '19', '20'];

type Props = {
  sex: Sex,
  query: string,
  centuries: string[],
  onSexSelect: (selectedSex: Sex) => void,
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};
export const PeopleFilters: React.FC<Props> = ({
  sex, query, centuries, onSexSelect, onInputChange,
}) => {
  const toggleCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(num => num !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === Sex.All })}
          params={{ sex: Sex.All }}
          onClick={() => onSexSelect(Sex.All)}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Male })}
          params={{ sex: Sex.Male }}
          onClick={() => onSexSelect(Sex.Male)}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': sex === Sex.Female })}
          params={{ sex: Sex.Female }}
          onClick={() => onSexSelect(Sex.Female)}
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
            onChange={onInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesToSelect.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1', {
                    'is-info': centuries.includes(century),
                  },
                )}
                params={{ centuries: toggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success', {
                  'is-outlined': centuries.length > 0,
                },
              )}
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
