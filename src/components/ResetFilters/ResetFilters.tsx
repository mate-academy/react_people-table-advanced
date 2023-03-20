import { SearchLink } from '../../utils/SearchLink';

export const ResetFilters = () => {
  return (
    <div className="panel-block">
      <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={{ sex: null, centuris: null, query: null }}
      >
        Reset all filters
      </SearchLink>
    </div>
  );
};
