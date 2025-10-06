import { useSearchParams } from 'react-router-dom';
import { Filter, SortKey, SortOrder } from '../types/Filter';

export const useFilter = (): Filter => {
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const sortKeyRaw = searchParams.get('sort');
  const sortOrderRaw = searchParams.get('order');

  const validSortKeys: SortKey[] = ['name', 'born', 'died', 'sex'];
  const validSortOrders: SortOrder[] = ['asc', 'desc'];

  let sort: Filter['sort'] = null;

  if (sortKeyRaw && validSortKeys.includes(sortKeyRaw as SortKey)) {
    const order =
      sortOrderRaw && validSortOrders.includes(sortOrderRaw as SortOrder)
        ? (sortOrderRaw as SortOrder)
        : 'asc';

    sort = {
      key: sortKeyRaw as SortKey,
      order,
    };
  }

  return {
    sex,
    query,
    centuries,
    sort,
  };
};
