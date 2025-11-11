import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface PeopleTableHeaderProps {
  sortBy: string;
  order: 'asc' | 'desc';
  setSearchParams: (params: URLSearchParams) => void;
}

export const PeopleTableHeader: React.FC<PeopleTableHeaderProps> = ({
  sortBy,
  order,
  setSearchParams,
}) => {
  const [searchParams] = useSearchParams();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'sex', label: 'Sex' },
    { key: 'born', label: 'Born' },
    { key: 'died', label: 'Died' },
    { key: 'motherName', label: 'Mother' },
    { key: 'fatherName', label: 'Father' },
  ];

  const handleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sortBy === field) {
      if (order === 'asc') {
        newParams.set('order', 'desc');
        newParams.set('sort', field);
      } else {
        newParams.delete('sort');
        newParams.delete('order');
      }
    } else {
      newParams.set('sort', field);
      newParams.set('order', 'asc');
    }

    setSearchParams(newParams);
  };

  return (
    <thead>
      <tr>
        {columns.map(col => {
          const isActive = sortBy === col.key;

          return (
            <th
              key={col.key}
              onClick={() => handleSort(col.key)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              className={isActive ? 'has-background-light' : ''}
            >
              <span className="is-flex is-align-items-center">
                {col.label}
                {isActive && (
                  <span className="ml-1">{order === 'asc' ? '▲' : '▼'}</span>
                )}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
