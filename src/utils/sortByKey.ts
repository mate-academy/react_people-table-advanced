import { Person } from '../types';
import { SortOrder } from '../types/sortOrder';

type SortConfig = {
  key: keyof Person;
  order: SortOrder;
};

export const sortByKey = (
  key: keyof Person,
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>,
) => {
  setSortConfig(prevConfig => {
    if (prevConfig.key === key) {
      if (prevConfig.order === 'none') {
        return { key, order: 'asc' };
      } else if (prevConfig.order === 'asc') {
        return { key, order: 'desc' };
      } else {
        return { key, order: 'none' };
      }
    } else {
      return { key, order: 'asc' };
    }
  });
};
