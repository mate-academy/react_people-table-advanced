import { SearchLink } from '../SearchLink/SearchLink';

export const ResetFilters = () => {
  return (
    <div className="panel-block">
      <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={{
          query: null,
          sex: null,
          centuries: null,
        }}
      >
        Reset all filters
      </SearchLink>
    </div>
  );
};
