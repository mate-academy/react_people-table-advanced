import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FilterType } from '../types/enum';
import { FilterCenturies } from './FilterCenturies';
import { FilterSex } from './FilterSex';

interface Props {
  sexFilterHandler: (value: FilterType) => void,
  setCurrentQuery: (value: string) => void,
  query: string,
  deleteQuery: () => void,
  handleCenturySelection: (value: number[]) => void,
  activeCenturies: number[],
  allCenturySelection: () => void,
  resetEveryThing: () => void,
  sexFilter: string,
  setActiveCenturies: (value: number[]) => void,
  searchParams: URLSearchParams,
}

export const PeopleFilters: React.FC<Props> = ({
  sexFilterHandler,
  setCurrentQuery,
  query,
  deleteQuery,
  handleCenturySelection,
  activeCenturies,
  allCenturySelection,
  resetEveryThing,
  sexFilter,
  setActiveCenturies,
  searchParams,
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
            onChange={(event) => setCurrentQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i
              role="button"
              className="fas fa-search"
              aria-hidden="true"
              onClick={deleteQuery}
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
            <NavLink
              data-cy="centuryALL"
              className={activeCenturies.length === 5
                ? 'button is-success'
                : 'button is-outlined'}
              to="#/people"
              onClick={allCenturySelection}
            >
              All
            </NavLink>
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
