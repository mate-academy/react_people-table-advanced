import { useSearchParams } from 'react-router-dom';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexInSearch = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const cents = searchParams.getAll('centuries');

  return { searchParams, setSearchParams, sexInSearch, query, cents };
};
