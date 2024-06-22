import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLinks';
import { SexFilter } from '../types/sexFilter';

type PeopleFiltersProps = { centuriesMark: number[] };

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  centuriesMark,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const isAllCenturiesChosen = centuries.length === centuriesMark.length;

  const handleCenturyChosen = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];
  };

  const handleNameSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(params);
  };

  const handleAllCenturyChosen = () => {
    if (!isAllCenturiesChosen) {
      return centuriesMark.map(String);
    } else {
      return [];
    }
  };

  const resetSearchParams = () => {
    setSearchParams('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilter).map(([key, value]) => (
          <SearchLink
            params={{ sex: value }}
            className={`${sexFilter === value && 'is-active'}`}
            key={key}
          >
            {key}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={handleNameSearch}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesMark.map((centrury: number) => (
              <SearchLink
                key={centrury}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(String(centrury)) && 'is-info'}`}
                params={{ centuries: handleCenturyChosen(String(centrury)) }}
              >
                {centrury}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${!isAllCenturiesChosen && 'is-outlined'}`}
              params={{ centuries: handleAllCenturyChosen() }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetSearchParams}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
