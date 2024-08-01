import { useSearchParams } from 'react-router-dom';

export function usePeopleSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortField = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];

  return {
    query,
    sex,
    sortField,
    order,
    centuries,
    searchParams,
    setSearchParams,
  };
}
