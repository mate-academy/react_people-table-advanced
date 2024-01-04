import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SortOrder } from '../types/SortOrder';

interface Props {
  sortField: string;
}

export const SortIcon: React.FC<Props> = ({ sortField }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  return (
    <span className="icon">
      <i
        className={cn('fas', {
          'fa-sort': sort !== sortField,
          'fa-sort-up': sort === sortField && sortOrder === SortOrder.Asc,
          'fa-sort-down': sort === sortField && sortOrder === SortOrder.Desc,
        })}
      />
    </span>
  );
};
