import { useSearchParams } from 'react-router-dom';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexInSearch = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const cents = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const hasAnySearchParam = sexInSearch !== null || !!query || cents.length > 0;

  return {
    searchParams,
    setSearchParams,
    sexInSearch,
    query,
    cents,
    sort,
    order,
    hasAnySearchParam,
  };
};
