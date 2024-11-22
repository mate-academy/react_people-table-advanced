import { useSearchParams } from 'react-router-dom';
import { SorterOrder } from '../utils/enums/sortedEnums';

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

    if (sort === sortType && order !== SorterOrder.DESC) {
      return { sort: sortType, order: SorterOrder.DESC };
    }

    return { sort: null, order: null };
  };

  return {
    sort,
    order,
    getSortParams,
  };
};
