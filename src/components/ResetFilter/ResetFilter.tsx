import { SearchLink } from '../SearchLink';

export const ResetFilter = () => {
  return (
    <div className="panel-block">
      <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={{ sex: null, query: null, centuries: null }}
      >
        Reset all filters
      </SearchLink>
    </div>
  );
};
