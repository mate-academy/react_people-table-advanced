import { useSearchParams } from 'react-router-dom';

type GetSortParams = (sortType: string) => {
  sort: string | null;
  order: string | null;
};

export const usePeopleSort = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams: GetSortParams = sortType => {
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
