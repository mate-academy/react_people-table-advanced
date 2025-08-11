import { useSearchParams } from 'react-router-dom';

export const useSortParams = () => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || '';
  const orderParam = searchParams.get('order') || '';

  return { sortParam, orderParam };
};
