import { FC } from 'react';
import { usePeopleSort } from '../hooks/usePeopleSort';

interface Props {
  sortType: string;
}

export const SortIcon: FC<Props> = ({ sortType }) => {
  const { sort, order } = usePeopleSort();

  const getIconView = () => {
    if (sort === sortType && order) {
      return <i className="fas fa-sort-down" />;
    }

    if (sort === sortType) {
      return <i className="fas fa-sort-up" />;
    }

    return <i className="fas fa-sort" />;
  };

  return <span className="icon">{getIconView()}</span>;
};
