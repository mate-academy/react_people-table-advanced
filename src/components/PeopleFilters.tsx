import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Sex } from '../utils/Sex';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const centuriesValues = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [filterParams, setFilterParams] = useSearchParams();
  const query = filterParams.get('query') || '';
  const centuries = filterParams.getAll('centuries') || [];
  const sex = filterParams.get('sex') as Sex || null;
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value || null;

    const newFilterParams = getSearchWith(filterParams, { query: newQuery });

    setFilterParams(newFilterParams);
  };

  const toggleCentury = (century: string) => {
    const newCent = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    return newCent;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn(
            { 'is-active': !sex },
          )}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn(
            { 'is-active': sex === Sex.Male },
          )}
          params={{ sex: Sex.Male }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn(
            { 'is-active': sex === Sex.Female },
          )}
          params={{ sex: Sex.Female }}
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
            {centuriesValues.map(century => (
              <SearchLink
                key={century}
                params={{ centuries: toggleCentury(century) }}
                data-cy="century"
                className={cn(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>

            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': centuries.length },
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
