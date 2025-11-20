import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filteredSex = searchParams.get('sex');
  const filteredCenturies = searchParams.get('centuries');
  const selectedCenturies = searchParams.getAll('centuries');

  const resetCenturiesFilters = {
    centuries: null,
  };

  const resetAllFilters = {
    sex: null,
    centuries: null,
    query: null,
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

  const arrowFilterSex = Object.entries(FilterSex);
  const arrowFilterCenturies = Object.entries(FilterCenturies);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (newValue === '') {
      params.delete('query');
    } else {
      params.set('query', newValue);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {arrowFilterSex.map(([key, path]) => {
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
              className={classNames({
                'is-active':
                  (path === '' && !filteredSex) || filteredSex === path,
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
            value={searchParams.get('query') || ''}
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
            {arrowFilterCenturies.map(([key, value]) => {
              const isSelected = selectedCenturies.includes(value);

              const updatedCenturies = isSelected
                ? selectedCenturies.filter(item => item !== value)
                : [...selectedCenturies, value];

              return (
                <SearchLink
                  key={key}
                  data-cy="century"
                  params={{ centuries: updatedCenturies }}
                  className={classNames('button mr-1', {
                    'is-info': selectedCenturies.includes(value),
                  })}
                >
                  {value}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={resetCenturiesFilters}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': filteredCenturies !== null,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={resetAllFilters}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
