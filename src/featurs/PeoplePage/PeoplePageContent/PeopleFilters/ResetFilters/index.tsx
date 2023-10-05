import { SearchLink } from '../../TableHeaders/TableHeder/SearchLink';

export const ResetFilters = () => (
  <div className="panel-block">
    <SearchLink
      className="button is-link is-outlined is-fullwidth"
      params={{
        sex: null,
        centuries: null,
        query: null,
      }}
    >
      Reset all filters
    </SearchLink>
  </div>
);
