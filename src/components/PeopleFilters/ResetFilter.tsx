import { SearchLink } from '../SearchLink';

export const ResetFilter:React.FC = () => {
  return (
    <div className="panel-block">
      <SearchLink
        params={{
          sex: null,
          query: null,
          centuries: null,
        }}
        className="button is-link is-outlined is-fullwidth"
      >
        Reset all filters
      </SearchLink>
    </div>
  );
};
