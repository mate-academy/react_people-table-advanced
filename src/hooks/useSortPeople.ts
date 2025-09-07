import { useMemo } from 'react';
import { useFilterPeople } from './useFilterPeople';

type Props = {
  query: string;
  sex: string;
  selectedCenturies: string[];
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
};

export const useSortPeople = ({
  query,
  sex,
  selectedCenturies,
  searchParams,
  setSearchParams,
}: Props) => {
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || 'asc';

  const { filteredPeople } = useFilterPeople({ query, sex, selectedCenturies });

  const handleSelectSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (currentOrder === 'asc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const sortedPeople = useMemo(() => {
    let sorted = [...filteredPeople];

    if (currentSort) {
      sorted.sort((a, b) => {
        switch (currentSort) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'born':
            return a.born - b.born;
          case 'sex':
            return a.sex.localeCompare(b.sex);
          case 'died':
            return a.died - b.died;
          default:
            return 0;
        }
      });

      if (currentOrder === 'desc') {
        sorted = sorted.reverse();
      }
    }

    return sorted;
  }, [filteredPeople, currentSort, currentOrder]);

  return {
    handleSelectSort,
    sortedPeople,
    currentSort,
    currentOrder,
  };
};
