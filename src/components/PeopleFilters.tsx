import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get('sex');
  const filterCenturies = searchParams.get('centuries');
  const selectedCenturies = searchParams.getAll('centuries');

  const resetCenturiesFilters = {
    centuries: null,
  };

  const resetAllFilters = {
    sex: null,
    centuries: null,
  };

  enum FilterSex {
    All = '',
    Male = 'm',
    Female = 'f',
  }

  const FilterCenturies = {
    16: '16',
    17: '17',
    18: '18',
    19: '19',
    20: '20',
  };

  const arrFilterSex = Object.entries(FilterSex);
  const arrFilterCenturies = Object.entries(FilterCenturies);
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get('query') || '',
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {arrFilterSex.map(([key, path]) => {
          let result = {};

          if (key === 'All') {
            result = { sex: null };
          } else if (key === 'Male') {
            result = { sex: 'm' };
          } else if (key === 'Female') {
            result = { sex: 'f' };
          }

          return (
            <SearchLink
              params={result}
              key={path}
              className={cn({
                'is-active':
                  (path === '' && !filterValue) || filterValue === path,
              })}
            >
              {key}
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
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {arrFilterCenturies.map(([key, value]) => {
              const isSelected = selectedCenturies.includes(value);

              const updatedCenturies = isSelected
                ? selectedCenturies.filter(item => item !== value)
                : [...selectedCenturies, value];

              return (
                <SearchLink
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': selectedCenturies.includes(value),
                  })}
                  params={{ centuries: updatedCenturies }}
                  key={key}
                >
                  {value}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={resetCenturiesFilters}
              className={cn('button is-success', {
                'is-outlined': filterCenturies !== null,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-fullwidth is-link is-outlined"
          params={resetAllFilters}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
