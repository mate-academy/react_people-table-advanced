import { useMemo } from 'react';
import cn from 'classnames';
import { centuryFilter, sexFilters } from './config/filters';
import { SearchLink } from '../SearchLink';

interface PeopleFiltersProps {
  hidden: boolean;
  toggleCenturySelection: (century: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedSex: string | null;
  searchQuery: string;
  selectedCenturies: string[];
}

const ariaLabels = {
  sexFilter: (title: string) => `Filter by ${title}`,
  search: 'Search by name',
  centuryFilter: (century: string) => `Filter by century ${century}`,
  showAllCenturies: 'Show all centuries',
  resetFilters: 'Reset all filters',
};

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}> = ({ active, onClick, label, children }) => (
  <button
    type="button"
    className={cn('button mr-1', { 'is-info': active })}
    onClick={onClick}
    aria-label={label}
  >
    {children}
  </button>
);

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  hidden,
  toggleCenturySelection,
  onSearchChange,
  selectedSex,
  searchQuery,
  selectedCenturies,
}) => {
  const sexFilterLinks = useMemo(
    () =>
      sexFilters.map(filter => (
        <SearchLink
          key={filter.title}
          aria-label={ariaLabels.sexFilter(filter.title)}
          className={cn('', {
            'is-active': selectedSex === filter.param,
          })}
          params={{ sex: filter.param }}
        >
          {filter.title}
        </SearchLink>
      )),
    [selectedSex],
  );

  const centuryFilterButtons = useMemo(
    () =>
      centuryFilter.map(century => (
        <FilterButton
          key={century}
          active={selectedCenturies.includes(century)}
          onClick={() => toggleCenturySelection(century)}
          label={ariaLabels.centuryFilter(century)}
        >
          {century}
        </FilterButton>
      )),
    [selectedCenturies, toggleCenturySelection],
  );

  return (
    <nav className="panel" hidden={hidden}>
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexFilterLinks}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={searchQuery}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={onSearchChange}
            aria-label={ariaLabels.search}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">{centuryFilterButtons}</div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': selectedCenturies.length > 0,
              })}
              params={{ centuries: [] }}
              aria-label={ariaLabels.showAllCenturies}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, query: null, sex: null }}
          aria-label={ariaLabels.resetFilters}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
