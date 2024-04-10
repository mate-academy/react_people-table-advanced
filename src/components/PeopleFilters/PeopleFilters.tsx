import { CenturyFilter } from '../CenturyFilter/CenturyFilter';
import { NameFilter } from '../NameFilter/NameFilter';
import { SexFilter } from '../SexFilter/SexFilter';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <SexFilter />
      <NameFilter />
      <CenturyFilter />
      <div className="panel-block">
        <SearchLink
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
          data-cy="centuryALL"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
