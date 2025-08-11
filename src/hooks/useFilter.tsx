import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const nameQuery = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const updateFilters = (params: SearchParams) => {
    setSearchParams(current => getSearchWith(current, params));
  };

  return {
    nameQuery,
    sex,
    centuries,
    sort,
    order,
    updateFilters,
  };
};
