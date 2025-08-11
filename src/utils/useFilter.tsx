import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from './searchHelper';

export function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const activeCenturies = searchParams.getAll('centuries') || [];

  const handleSearch = (params: SearchParams) => {
    setSearchParams(current => getSearchWith(current, params));
  };

  const getSortParams = (sortBy: string) => {
    if (sortBy === sort && !order) {
      return { sort: sortBy, order: 'desc' };
    }

    if (sortBy !== sort && !order) {
      return { sort: sortBy, order: null };
    }

    return { sort: null, order: null };
  };

  return {
    handleSearch,
    getSortParams,
    query,
    sex,
    sort,
    order,
    activeCenturies,
    searchParams,
  };
}
