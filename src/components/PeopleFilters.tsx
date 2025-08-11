import React, { useState } from 'react';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

interface PeopleFiltersProps {
  onNameFilterChange: (query: string) => void;
  onCenturyFilterChange: (century: string, isSelected: boolean) => void;
  onSortChange: (field: string) => void;
  onSexFilterChange: (sex: string | null) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  onNameFilterChange,
  onCenturyFilterChange,
}) => {
  const [selectedSex, setSelectedSex] = useState<string | null>(null);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': selectedSex === null })}
          params={{ sex: null }}
          onClick={() => setSelectedSex(null)}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': selectedSex === 'm' })}
          params={{ sex: 'm' }}
          onClick={() => setSelectedSex('m')}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': selectedSex === 'f' })}
          params={{ sex: 'f' }}
          onClick={() => setSelectedSex('f')}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={e => onNameFilterChange(e.target.value)}
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
              <button
                key={century}
                className="button mr-1 is-info"
                onClick={() => onCenturyFilterChange(century, false)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, centuries: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
