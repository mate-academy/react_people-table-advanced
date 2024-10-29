import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from './searchHelper';

export const useUpdateSortAndQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = (newQuery: string | null) => {
    const newParams = getSearchWith(searchParams, { query: newQuery });

    setSearchParams(newParams);
  };

  const updateSort = (sortField: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');
    let newParams;

    if (currentSort === sortField) {
      switch (currentOrder) {
        case 'asc':
          newParams = getSearchWith(searchParams, {
            sort: sortField,
            order: 'desc',
          });
          break;
        case 'desc':
          newParams = getSearchWith(searchParams, {
            sort: null,
            order: null,
          });
          break;
        default:
          newParams = getSearchWith(searchParams, {
            sort: sortField,
            order: 'asc',
          });
          break;
      }
    } else {
      newParams = getSearchWith(searchParams, {
        sort: sortField,
        order: 'asc',
      });
    }

    setSearchParams(newParams);
  };

  return { updateQuery, updateSort, searchParams };
};
