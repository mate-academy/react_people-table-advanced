import { useSearchParams } from 'react-router-dom';

export const usePeopleSortParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const setURLSortParams = (sortBy: string) => {
    const newParams = new URLSearchParams(searchParams);

    const isCurrentSort = currentSort === sortBy;

    if (!isCurrentSort) {
      newParams.set('sort', sortBy);
    } else if (isCurrentSort && !currentOrder) {
      newParams.append('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const getSortIconClass = (columnTitle: string): string => {
    const params = Object.fromEntries(searchParams.entries());
    const isSorted = params.sort === columnTitle;

    if (!isSorted) {
      return 'fas fa-sort';
    }

    if (params.order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  return { setURLSortParams, getSortIconClass, currentSort, currentOrder };
};
