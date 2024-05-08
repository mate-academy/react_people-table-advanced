import cn from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  columnName: string;
};

const SortIcon: React.FC<Props> = ({ columnName }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <span className="icon">
      <i
        className={cn(
          'fas',
          { 'fa-sort': sortBy !== columnName },
          {
            'fa-sort-up': sortBy === columnName && order !== 'desc',
          },
          {
            'fa-sort-down': sortBy === columnName && order === 'desc',
          },
        )}
      ></i>
    </span>
  );
};

export default SortIcon;
