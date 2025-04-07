import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/searchHelper';

export const usePeopleFilterParams = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSexFilter = searchParams.get('sex');
  const currentCenturiesFilter = searchParams.getAll('centuries');
  const currentQueryFilter = searchParams.get('query');

  const setQueryFilter = (value: string) => {
    const updated = getSearchWith(searchParams, {
      query: value.trim() || null,
    });

    navigate({ search: updated });
  };

  return {
    currentSexFilter,
    currentCenturiesFilter,
    currentQueryFilter,
    setQueryFilter,
  };
};
