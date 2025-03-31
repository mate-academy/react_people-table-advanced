import React from 'react';
import { FilterType } from '../types/FilterType';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') || FilterType.ALL;
  const nameFilter = searchParams.get('name') || '';
  const centuryFilter =
    searchParams.get('centuries')?.split(',').map(Number) || [];

  const handleNameFilter = (name: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (!name) {
      newParams.delete('name');
    } else {
      newParams.set('name', name);
    }

    setSearchParams(newParams);
  };

  const handleSexFilter = (sex: FilterType) => {
    const newParams = new URLSearchParams(searchParams);

    if (sex === FilterType.ALL) {
      newParams.delete('sex');
    } else {
      newParams.set('sex', sex);
    }

    setSearchParams(newParams);
  };

  const handleCenturyFilter = (century: number) => {
    const newParams = new URLSearchParams(searchParams);
    const currentCenturies =
      newParams.get('centuries')?.split(',').map(Number) || [];

    let updatedCenturies: number[];

    if (currentCenturies.includes(century)) {
      updatedCenturies = currentCenturies.filter(c => c !== century);
    } else {
      updatedCenturies = [...currentCenturies, century];
    }

    if (updatedCenturies.length === 0) {
      newParams.delete('centuries');
    } else {
      newParams.set('centuries', updatedCenturies.join(','));
    }

    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const centuries = [16, 17, 18, 19, 20];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(FilterType).map(value => (
          <a
            key={value}
            href="#"
            className={cn('', {
              'is-active':
                (value === FilterType.ALL && !searchParams.get('sex')) ||
                value.toLowerCase() === sexFilter.toLowerCase(),
            })}
            onClick={e => {
              e.preventDefault();
              handleSexFilter(value);
            }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={nameFilter}
            onChange={e => handleNameFilter(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <button
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuryFilter.includes(century),
                })}
                onClick={() => handleCenturyFilter(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuryFilter.length > 0,
              })}
              onClick={resetFilters}
            >
              All
            </button>
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
