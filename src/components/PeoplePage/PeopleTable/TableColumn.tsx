import React from 'react';
import cn from 'classnames';
import { SearchLink } from '../../SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  column: string[];
};

export const TableColumn: React.FC<Props> = ({ column }) => {
  const [key, value] = column;

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const handleSort = (sortBy: string) => {
    if (sort === sortBy && order) {
      return { sort: null, order: null };
    }

    if (sort === sortBy) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: sortBy, order: null };
  };

  return (
    <th key={value}>
      <span className="is-flex is-flex-wrap-nowrap">
        {key}
        <SearchLink params={handleSort(value)}>
          <span className="icon">
            <i
              className={cn(
                'fas',
                { 'fa-sort': sort !== value },
                { 'fa-sort-up': sort === value && order === null },
                { 'fa-sort-down': sort === value && order === 'desc' },
              )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
