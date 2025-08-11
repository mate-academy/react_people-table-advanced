import { CenturyFilter } from '../Filters/CenturyFilter';
import { NameFilter } from '../Filters/NameFilter';
import { SexFilter } from '../Filters/SexFilter';
import { SearchLink } from '../SortFilterLinks/SearchLink';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SexFilter />
      </p>

      <div className="panel-block">
        <NameFilter />
      </div>

      <div className="panel-block">
        <CenturyFilter />
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
