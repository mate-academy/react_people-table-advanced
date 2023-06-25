import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FilterType } from '../types/enum';
import { FilterCenturies } from './FilterCenturies';
import { FilterSex } from './FilterSex';
import { SearchLink } from './SearchLink';

interface Props {
  sexFilterHandler: (value: FilterType) => void,
  setCurrentQuery: (e: React.ChangeEvent<HTMLInputElement>) => void,
  query: string,
  handleCenturySelection: (value: number[]) => void,
  activeCenturies: number[],
  allCenturySelection: () => void,
  resetEveryThing: () => void,
  sexFilter: string,
  setActiveCenturies: (value: number[]) => void,
  searchParams: URLSearchParams,
  deleteSearch: () => void,
}

export const PeopleFilters: React.FC<Props> = ({
  sexFilterHandler,
  setCurrentQuery,
  query,
  handleCenturySelection,
  activeCenturies,
  allCenturySelection,
  resetEveryThing,
  sexFilter,
  setActiveCenturies,
  searchParams,
  deleteSearch,
}) => {
  useEffect(() => {
    const activeCenturiesFromParams = searchParams.get('centuries');
    const centuriesArray = activeCenturiesFromParams
      ? activeCenturiesFromParams.split(',').map((century) => Number(century))
      : [];

    setActiveCenturies(centuriesArray);
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterSex
        sexFilter={sexFilter}
        sexFilterHandler={sexFilterHandler}
      />

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => setCurrentQuery(event)}
          />

          <span className="icon is-left">
            <i
              role="button"
              className="fas fa-search"
              aria-hidden="true"
              onClick={deleteSearch}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <FilterCenturies
            handleCenturySelection={handleCenturySelection}
            activeCenturies={activeCenturies}
          />

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={activeCenturies.length === 5
                ? 'button is-success'
                : 'button is-outlined'}
              params={{ centuries: [String([15, 16, 17, 18, 19])] }}
              onClick={allCenturySelection}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <NavLink
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
          onClick={resetEveryThing}
        >
          Reset all filters
        </NavLink>
      </div>
    </nav>
  );
};
