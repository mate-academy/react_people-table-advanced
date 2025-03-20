import classNames from "classnames";
import { GenderFilter } from "../types/GenderFilter";
import { Link } from "react-router-dom";
import React from "react";
import { getSearchWith } from "../utils/searchHelper";

type Props = {
  query: string,
  searchParams: URLSearchParams,
  genderFilter: GenderFilter,
  appliedCentury: string[],
  onGenderChange: (filter: GenderFilter) => void,
  onCenturyChange: (century: string) => void,
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  resetFilters: () => void,
}

export const PeopleFilters: React.FC<Props> = ({
  query,
  searchParams,
  genderFilter,
  appliedCentury,
  onGenderChange,
  onCenturyChange,
  onQueryChange,
  resetFilters,
}) => {
  
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': genderFilter === GenderFilter.All,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: null})
          }}
          onClick={() => onGenderChange(GenderFilter.All)}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': genderFilter === GenderFilter.Male,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'm'})
          }}
          onClick={() => onGenderChange(GenderFilter.Male)}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': genderFilter === GenderFilter.Female,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'f'})
          }}
          onClick={() => onGenderChange(GenderFilter.Female)}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={onQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': appliedCentury.includes(century),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: [...appliedCentury, century],
                  })
                }}
                onClick={() => onCenturyChange(century)}
              >
                {century}
              </Link>
            ))}
            
          </div>

          <div className="level-right ml-4">
            <Link
             data-cy="centuryALL"
             className={classNames('button is-success', {
               'is-outlined': appliedCentury.length > 0,
             })}
             to={{
               search: getSearchWith(searchParams, {
                 centuries: ['16', '17', '18', '19', '20'],
               }),
             }}
             onClick={() => onCenturyChange('all')}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
