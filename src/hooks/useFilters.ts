import { useSearchParams } from 'react-router-dom';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexInSearch = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const cents = searchParams.getAll('centuries');
  const hasAnySearchParam = sexInSearch !== null || !!query || cents.length > 0;

  return {
    searchParams,
    setSearchParams,
    sexInSearch,
    query,
    cents,
    hasAnySearchParam,
  };
};
