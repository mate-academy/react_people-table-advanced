import { Dispatch } from 'react';
import { FilterCentury } from '../FilterCentury/FilterCentury';
import { FilterGender } from '../FilterGender';

interface PeopeleFiltersProps {
  setQuery: Dispatch<React.SetStateAction<string>>;
  query: string;
}

export const PeopleFilters: React.FC<PeopeleFiltersProps> = ({
  query,
  setQuery,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterGender />

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
        <FilterCentury />
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
