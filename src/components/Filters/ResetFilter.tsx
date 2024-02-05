import { SearchLink } from '../SearchLink';

export const ResetFilter = () => (
  <div className="panel-block">
    <SearchLink
      params={{ centuries: null, sex: null, query: null }}
      className="button is-link is-outlined is-fullwidth"
    >
      Reset all filters
    </SearchLink>
  </div>
);
