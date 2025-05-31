import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const ResetFiltersButton = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleReset = () => {
    const newParams = getSearchWith(searchParams, {
      query: null,
      sex: null,
      century: null,
      sort: null,
      order: null,
    });

    navigate({
      pathname: '/people',
      search: newParams.toString(),
    });
  };

  return (
    <div className="panel-block">
      <button
        className="button is-link is-outlined is-fullwidth"
        onClick={handleReset}
      >
        Reset all filters
      </button>
    </div>
  );
};