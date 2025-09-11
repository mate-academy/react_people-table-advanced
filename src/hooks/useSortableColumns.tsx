import { SortType, OrderType } from '../types/Sort';
import { Person } from '../types/Person';

export const useSortableColumns = () => {
  const SortableColumns = (
    type: SortType,
    order: OrderType,
    data: Person[],
  ) => {
    const copyData = [...data];

    switch (type) {
      case 'name':
        return copyData.sort((a, b) => {
          const sorted = a.name
            .toLowerCase()
            .localeCompare(b.name.toLowerCase());

          return order === 'desc' ? -sorted : sorted;
        });

      case 'sex':
        return copyData.sort((a, b) => {
          const sorted = a.sex.toLowerCase().localeCompare(b.sex.toLowerCase());

          return order === 'desc' ? -sorted : sorted;
        });

      case 'born':
        return copyData.sort((a, b) =>
          order === 'desc' ? b.born - a.born : a.born - b.born,
        );

      case 'died':
        return copyData.sort((a, b) =>
          order === 'desc' ? b.died - a.died : a.died - b.died,
        );

      default:
        return copyData;
    }
  };

  return {
    SortableColumns,
  };
};
