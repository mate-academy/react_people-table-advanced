import { Dispatch } from 'react';
import { FilterCentury } from '../FilterCentury/FilterCentury';
import { FilterGender } from '../FilterGender';
import { Sex } from '../../types/Sex';

interface PeopleFiltersProps {
  setQuery: Dispatch<React.SetStateAction<string>>;
  query: string;
  setCenturyFilter: Dispatch<React.SetStateAction<number[]>>;
  centuryFilter: number[];
  setSexFilter: Dispatch<React.SetStateAction<Sex | null>>;
  sexFilter: Sex | null;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  query,
  setQuery,
  sexFilter,
  setSexFilter,
  setCenturyFilter,
  centuryFilter,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterGender setSexFilter={setSexFilter} sexFilter={sexFilter} />

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event => setQuery(event.target.value.trimStart())}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <FilterCentury
          setCenturyFilter={setCenturyFilter}
          centuryFilter={centuryFilter}
        />
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={() => {
            setQuery('');
            setCenturyFilter([]);
            setSexFilter(null);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
