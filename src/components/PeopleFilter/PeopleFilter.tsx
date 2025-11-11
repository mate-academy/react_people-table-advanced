import React from 'react';
import { Person } from '../../types';
import { SexFilter } from './SexFilter';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';

interface PeopleFiltersProps {
  searchParams: URLSearchParams;
  localSearch: Person['name'];
  onChangeLocalSearch?: (name: Person['name']) => void;
  onResetFilters?: () => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  searchParams,
  localSearch,
  onChangeLocalSearch = () => {},
  onResetFilters = () => {},
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter searchParams={searchParams} />

      <NameFilter
        localSearch={localSearch}
        onChangeLocalSearch={onChangeLocalSearch}
      />

      <CenturyFilter searchParams={searchParams} />

      <div className="panel-block">
        <button
          className="button is-Link is-outlined is-fullwidth"
          onClick={onResetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
