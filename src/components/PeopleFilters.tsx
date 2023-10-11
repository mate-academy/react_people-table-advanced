/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import { useState } from 'react';
import { SearchLink } from './SearchLink';

interface PeopleFilterProps {
  searchParams: URLSearchParams,
  onSearchInputChange: (event: string) => void
}

export const PeopleFilters:React.FC<PeopleFilterProps>
= ({ searchParams, onSearchInputChange }) => {
  const [searchedPhrase, setSearchedPhrase]
   = useState<string>('');
  const centuries = ['16', '17', '18', '19', '20'];
  const sex = searchParams.get('sex');
  const chosenCenturies = searchParams.getAll('centuries');

  const handleCenturyAddition = (century: string) => {
    if (chosenCenturies.includes(century)) {
      return chosenCenturies
        .filter(currentCentury => currentCentury !== century);
    }

    return [...chosenCenturies, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': sex === '',
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': sex === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': sex === 'f',
          })}
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
            value={searchedPhrase}
            onChange={(event) => {
              setSearchedPhrase(event.target.value);
              onSearchInputChange(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map((century, centuryIndex) => (
              <SearchLink
                key={centuryIndex}
                params={{ centuries: handleCenturyAddition(century) }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': chosenCenturies.includes(century),
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
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          data-cy="centuryALL"
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
