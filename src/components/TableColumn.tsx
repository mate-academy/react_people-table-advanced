import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  columnName: string;
  columnValue: string;
};

export const TableColumn: React.FC<Props> = ({ columnName, columnValue }) => {
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
    <th key={columnValue}>
      <span className="is-flex is-flex-wrap-nowrap">
        {columnName}
        <SearchLink params={handleSort(columnValue)}>
          <span className="icon">
            <i
              className={cn(
                'fas',
                { 'fa-sort': sort !== columnValue },
                { 'fa-sort-up': sort === columnValue && order === null },
                { 'fa-sort-down': sort === columnValue && order === 'desc' },
              )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
