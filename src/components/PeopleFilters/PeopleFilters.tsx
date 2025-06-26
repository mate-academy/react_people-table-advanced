// import { Dispatch } from 'react';
import { FilterCentury } from '../FilterCentury/FilterCentury';
import { FilterGender } from '../FilterGender';
import { SearchLink } from '../SearchLink';

interface PeopleFiltersProps {
  query: string;
  centuries: string[];
  sex: string | null;
  changeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PeopleFilters: React.FC<PeopleFiltersProps> = ({
  query,
  centuries,
  sex,
  changeQuery,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <FilterGender sex={sex} />

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
        <FilterCentury centuries={centuries} />
      </div>

      <div className="panel-block">
        <SearchLink
          data-cy="centuryALL"
          className="button is-link is-fullwidth is-outlined"
          params={{ query: null, sex: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
