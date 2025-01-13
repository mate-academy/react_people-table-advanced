// components/PeopleFilters.tsx

import React, { ChangeEvent } from 'react';
import { SearchParams } from '../utils/searchHelper';

interface PeopleFiltersProps {
  searchParams: URLSearchParams;
  updateSearchParams: (paramsToUpdate: SearchParams) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  searchParams,
  updateSearchParams,
}) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value) {
      updateSearchParams({ name: value });
    } else {
      updateSearchParams({ name: null });
    }
  };

  const handleSexChange = (sex: string) => {
    if (sex === 'all') {
      updateSearchParams({ sex: null });
    } else {
      updateSearchParams({ sex });
    }
  };

  const handleCenturyChange = (century: string) => {
    const currentCenturies = searchParams.getAll('centuries');

    if (currentCenturies.includes(century)) {
      const updatedCenturies = currentCenturies.filter(c => c !== century);

      updateSearchParams({
        centuries: updatedCenturies.length > 0 ? updatedCenturies : null,
      });
    } else {
      updateSearchParams({ centuries: [...currentCenturies, century] });
    }
  };

  const handleReset = () => {
    updateSearchParams({
      name: null,
      sex: null,
      centuries: null,
      sort: null,
      order: null,
    });
  };

  const selectedSex = searchParams.get('sex') || 'all';
  const selectedCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex Filter */}
      <div className="panel-tabs" data-cy="SexFilter">
        <a
          className={selectedSex === 'all' ? 'is-active' : ''}
          onClick={() => handleSexChange('all')}
        >
          All
        </a>
        <a
          className={selectedSex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={selectedSex === 'f' ? 'is-active' : ''}
          onClick={() => handleSexChange('f')}
        >
          Female
        </a>
      </div>

      {/* Name Filter */}
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search by name"
            defaultValue={searchParams.get('name') || ''}
            onChange={handleNameChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {/* Century Filter */}
      <div className="panel-block">
        <div className="buttons is-flex-wrap-wrap" data-cy="CenturyFilter">
          {['16', '17', '18', '19', '20'].map(century => (
            <button
              key={century}
              data-cy="century"
              className={`button ${
                selectedCenturies.includes(century) ? 'is-info' : ''
              }`}
              onClick={() => handleCenturyChange(century)}
            >
              {century}
            </button>
          ))}
          <button
            data-cy="centuryALL"
            className={`button is-success ${
              selectedCenturies.length === 0 ? 'is-active' : 'is-outlined'
            }`}
            onClick={() => updateSearchParams({ centuries: null })}
          >
            All
          </button>
        </div>
      </div>

      <div className="panel-block">
        <button className="button is-link is-fullwidth" onClick={handleReset}>
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
