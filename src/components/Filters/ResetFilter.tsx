import { SearchLink } from '../../utils/SearchLink';

const ResetFilter = () => (
  <div className="panel-block">
    <SearchLink
      params={{ query: null, centuries: null, sex: null }}
      className="button is-link is-outlined is-fullwidth"
    >
      Reset all filters
    </SearchLink>
  </div>
);

export default ResetFilter;
