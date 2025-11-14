import React from 'react';
import { Person } from '../types';

type SortField = Pick<Person, 'born' | 'died' | 'name' | 'sex'> | string;

interface SortingArrowProps {
  sort: SortField | null;
  order: string | null;
  field: SortField;
}

export const SortingArrow: React.FC<SortingArrowProps> = ({
  sort,
  order,
  field,
}) => {
  if (sort && sort === field && !order) {
    return (
      <span className="icon">
        <i className="fas fa-sort-up" />
      </span>
    );
  }

  if (sort && sort === field && order === 'desc') {
    return (
      <span className="icon">
        <i className="fas fa-sort-down" />
      </span>
    );
  }

  return (
    <span className="icon">
      <i className="fas fa-sort" />
    </span>
  );
};
