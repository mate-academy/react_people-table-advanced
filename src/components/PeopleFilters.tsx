import React from 'react';
import cn from 'classnames';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import { Filter } from '../utils/filter';

type Props = {
  filter: Filter;
  onFilterChange: React.Dispatch<React.SetStateAction<Filter>>;
  handleQuery: React.ChangeEventHandler<HTMLInputElement>;
  query: string;
};

export const PeopleFilters: React.FC<Props> = ({
  filter,
  onFilterChange,
  handleQuery,
  query,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCenturies = searchParams.getAll('centuries').map(Number);

  const handleCenturyClick = (century: number | 'All') => {
    const params = new URLSearchParams(searchParams);

    if (century === 'All') {
      params.delete('centuries');
    } else {
      if (activeCenturies.includes(century)) {
        const updatedCenturies = activeCenturies.filter(
          activeCentury => activeCentury !== century,
        );

        params.delete('centuries');
        updatedCenturies.forEach(updatedCentury =>
          params.append('centuries', updatedCentury.toString()),
        );
      } else {
        params.append('centuries', century.toString());
      }
    }

    setSearchParams(params);
  };

  const handleFilterClick = (filterValue: Filter) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (filterValue === Filter.male) {
      newParams.set('sex', 'm');
    } else if (filterValue === Filter.female) {
      newParams.set('sex', 'f');
    } else {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
    onFilterChange(filterValue);
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams();

    setSearchParams(params);

    onFilterChange(Filter.all);
  };

  const CENTURIES = [16, 17, 18, 19, 20];
  const isAllActive = activeCenturies.length;

  return (
    <nav className="panel" data-cy="Filter">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs">
        {Object.values(Filter).map(value => (
          <NavLink
            key={value}
            to={`/people?filter=${value}`}
            className={cn('panel-tab', {
              'is-active': filter === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={e => {
              e.preventDefault();
              handleFilterClick(value);
            }}
          >
            {value}
          </NavLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQuery}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': activeCenturies.includes(century),
                })}
                to={`/people?${searchParams.toString()}`}
                onClick={e => {
                  e.preventDefault();
                  handleCenturyClick(century);
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <NavLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': isAllActive,
              })}
              to="/people"
              onClick={e => {
                e.preventDefault();
                handleCenturyClick('All');
              }}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
