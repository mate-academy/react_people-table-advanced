import { useSearchParams } from 'react-router-dom';

export const useSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (sortField: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const newSearchParams = new URLSearchParams(searchParams);

    if (currentSort === sortField) {
      if (currentOrder === 'asc') {
        newSearchParams.set('order', 'desc');
      } else {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      }
    } else {
      newSearchParams.set('sort', sortField);
      newSearchParams.set('order', 'asc');
    }

    setSearchParams(newSearchParams);
  };

  return handleSort;
};
