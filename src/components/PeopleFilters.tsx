import { SearchLink } from './SearchLink';

import { SexFilter } from './SexFilter';
import { NameFilter } from './NameFilter';
import { CenturyFilter } from './CenturyFilter';

export const PeopleFilters: React.FC = () => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>

    <SexFilter />

    <NameFilter />

    <CenturyFilter />

    <div className="panel-block">
      <SearchLink
        params={{
          sex: null,
          query: null,
          order: null,
          centuries: [],
        }}
        className="button is-link is-outlined is-fullwidth"
      >
        Reset all filters
      </SearchLink>
    </div>
  </nav>
);
