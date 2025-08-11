import { SearchLink } from '../../../../SearchLink';

export const ResetAllFilters = () => {
  return (
    <div className="panel-block">
      <SearchLink
        data-cy="centuryALL"
        className="button is-link is-outlined is-fullwidth"
        params={{ sex: null, query: null, centuries: null }}
      >
        Reset all filters
      </SearchLink>
    </div>
  );
};
