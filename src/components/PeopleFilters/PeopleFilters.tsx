// import { Dispatch } from 'react';
import { FilterCentury } from '../FilterCentury/FilterCentury';
import { FilterGender } from '../FilterGender';

interface PeopleFiltersProps {
  query: string;
  centuryFilter: string[];
  sexFilter: string | null;
  changeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  query,
  sexFilter,
  centuryFilter,
  changeQuery,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterGender sexFilter={sexFilter} />

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={changeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <FilterCentury centuryFilter={centuryFilter} />
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          // onClick={() => {
          //   setQuery('');
          //   setCenturyFilter([]);
          //   setSexFilter(null);
          // }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
