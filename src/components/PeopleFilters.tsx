import React from 'react';
import { SexFilter } from './SexFilter';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';

export const PeopleFilters: React.FC = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <SexFilter />

      <NameFilter />

      <CenturyFilter />

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
