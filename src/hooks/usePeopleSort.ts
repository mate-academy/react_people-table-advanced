import { useSearchParams } from 'react-router-dom';

export const usePeopleSort = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (
    sortType: string,
  ): { sort: string | null; order: string | null } => {
    if (!sort || (sort && sort !== sortType)) {
      return { sort: sortType, order: null };
    }

    if (sort === sortType && order !== 'desc') {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return {
    sort,
    order,
    getSortParams,
  };
};
