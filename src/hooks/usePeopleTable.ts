import { useSearchParams } from 'react-router-dom';

export const usePeopleTable = () => {
  const [searchParams] = useSearchParams();

  const sortSearchParam = searchParams.get('sort') || '';
  const orderSearchParam = searchParams.get('order') || '';

  return {
    sortSearchParam,
    orderSearchParam,
  };
};
