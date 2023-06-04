import { FC } from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  sex: string,
  inputName: string,
  centuries: string[],
  onInputChange: (input: string) => void,
};

const sexFilterOptions = ['All', 'Male', 'Female'];
const centuriesFilterOptions = ['16', '17', '18', '19', '20'];

export const PeopleFilters: FC<Props> = ({
  sex,
  inputName,
  centuries,
  onInputChange,
}) => {
  const updateCentury = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(currCentury => currCentury !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilterOptions.map(option => {
          const lowercaseFirstChar = option[0].toLowerCase();
          const isActive = sex === lowercaseFirstChar
            || (option === 'All' && !sex);

          return (
            <SearchLink
              key={option}
              params={{
                sex: option === 'All'
                  ? null
                  : lowercaseFirstChar,
              }}
              className={classNames({ 'is-active': isActive })}
            >
              {option}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={inputName}
            onChange={(event) => onInputChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesFilterOptions.map(option => (
              <SearchLink
                key={option}
                data-cy="century"
                params={{ centuries: updateCentury(option) }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(option),
                })}
              >
                {option}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
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
            sex: null,
            centuries: null,
          }}
          onClick={() => onInputChange('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
