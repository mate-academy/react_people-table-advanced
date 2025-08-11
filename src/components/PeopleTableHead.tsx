import React from 'react';
import { SortOrder } from '../types/SortOrder';

type Props = {
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const PeopleTableHead: React.FC<Props> = ({
  sortOrder,
  setSortOrder,
  searchParams,
  setSearchParams,
}) => {
  const handleSort = (column: keyof SortOrder) => {
    const currentOrder = sortOrder[column];
    const nextOrder: 'asc' | 'desc' | undefined =
      currentOrder === 'asc'
        ? 'desc'
        : currentOrder === 'desc'
          ? undefined
          : 'asc';

    const newSortOrder: SortOrder = {
      name: column === 'name' ? nextOrder : undefined,
      sex: column === 'sex' ? nextOrder : undefined,
      born: column === 'born' ? nextOrder : undefined,
      died: column === 'died' ? nextOrder : undefined,
    };

    setSortOrder(newSortOrder);

    const params = new URLSearchParams(searchParams);

    if (nextOrder) {
      params.set('sort', column);
      if (nextOrder === 'desc') {
        params.set('order', 'desc');
      } else {
        params.delete('order');
      }
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  return (
    <thead>
      <tr>
        {(['name', 'sex', 'born', 'died'] as (keyof SortOrder)[]).map(
          column => {
            const iconClasses = {
              asc: 'fa-sort-up',
              desc: 'fa-sort-down',
            } as const;
            const iconClass = sortOrder[column]
              ? iconClasses[sortOrder[column] as 'asc' | 'desc']
              : 'fa-sort';

            return (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  <a
                    href={`?sort=${column}&order=${sortOrder[column] === 'desc' ? 'desc' : ''}`}
                    onClick={e => {
                      e.preventDefault();
                      handleSort(column);
                    }}
                  >
                    <span className="icon">
                      <i className={`fas ${iconClass}`} />
                    </span>
                  </a>
                </span>
              </th>
            );
          },
        )}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
