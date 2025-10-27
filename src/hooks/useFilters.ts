import { useSearchParams } from 'react-router-dom';

export function useFilters() {
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return {
    sex,
    query,
    centuries,
    sort,
    order,
  };
}
