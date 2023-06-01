import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FilterType } from './enum';

interface Props {
  sexFilterHandler: (value: FilterType) => void,
  setCurrentQuery: (value: string) => void,
  query: string,
  deleteQuery: () => void,
  handleCenturySelection: (value: number) => void,
  selecetedCentury: number[],
  allCenturySelection: () => void,
  resetEveryThing: () => void,
}

export const PeopleFilters: React.FC<Props> = ({
  sexFilterHandler,
  setCurrentQuery,
  query,
  deleteQuery,
  handleCenturySelection,
  selecetedCentury,
  allCenturySelection,
  resetEveryThing,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={({ isActive }) => (
            cn(
              'navbar-item',
              {
                'is-active': isActive,
              },
            )
          )}
          to="#/people"
          onClick={() => sexFilterHandler(FilterType.All)}
          role="button"
        >
          All
        </NavLink>
        <NavLink
          className={({ isActive }) => (
            cn(
              'navbar-item',
              {
                'is-active': isActive,
              },
            )
          )}
          to="#/people?sex=m"
          onClick={() => sexFilterHandler(FilterType.Male)}
          role="button"
        >
          Male
        </NavLink>
        <NavLink
          className={({ isActive }) => (
            cn(
              'navbar-item',
              {
                'is-active': isActive,
              },
            )
          )}
          to="#/people?sex=f"
          onClick={() => sexFilterHandler(FilterType.Female)}
          role="button"
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => {
              setCurrentQuery(event.target.value);
            }}
          />

          <span className="icon is-left">
            <i
              className="fas fa-search"
              aria-hidden="true"
              onClick={deleteQuery}
            />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <NavLink
              data-cy="century"
              className={selecetedCentury.includes(15)
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              to="#/people?centuries=16"
              onClick={() => handleCenturySelection(15)}
            >
              16
            </NavLink>

            <NavLink
              data-cy="century"
              className={selecetedCentury.includes(16)
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              to="#/people?centuries=17"
              onClick={() => handleCenturySelection(16)}
            >
              17
            </NavLink>

            <NavLink
              data-cy="century"
              className={selecetedCentury.includes(17)
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              to="#/people?centuries=18"
              onClick={() => handleCenturySelection(17)}
            >
              18
            </NavLink>

            <NavLink
              data-cy="century"
              className={selecetedCentury.includes(18)
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              to="#/people?centuries=19"
              onClick={() => handleCenturySelection(18)}
            >
              19
            </NavLink>

            <NavLink
              data-cy="century"
              className={selecetedCentury.includes(19)
                ? 'button mr-1 is-info'
                : 'button mr-1'}
              to="#/people?centuries=20"
              onClick={() => handleCenturySelection(19)}
            >
              20
            </NavLink>
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="#/people"
              onClick={() => allCenturySelection()}
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
