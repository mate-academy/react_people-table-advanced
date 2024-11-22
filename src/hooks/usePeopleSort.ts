import { useSearchParams } from 'react-router-dom';
import { SorterOrder, SorterTypes } from '../utils/enums/sortedEnums';

type GetSortParams = (sortType: string) => {
  sort: string | null;
  order: string | null;
};

export const usePeopleSort = () => {
  const [searchParams] = useSearchParams();

  const sort = <SorterTypes>searchParams.get('sort') || null;
  const order = <SorterOrder>searchParams.get('order') || null;

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
