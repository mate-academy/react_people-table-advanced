import { Link, useSearchParams } from 'react-router-dom';
import { DEFAULT_FILTER_SEARCH_PARAMS } from '../../types/Filter';
import { getSearchWith } from '../../utils/searchHelper';

export const ResetFilters = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="panel-block">
      <Link
        className="button is-link is-outlined is-fullwidth"
        to={{
          pathname: '/people',
          search: getSearchWith(searchParams, DEFAULT_FILTER_SEARCH_PARAMS),
        }}
      >
        Reset all filters
      </Link>
    </div>
  );
};
