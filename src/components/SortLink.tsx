import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SortField, SortOrder } from '../types/Sort';

type Props = {
  field: SortField;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') as SortField | null;
  const currentOrder = searchParams.get('order') as SortOrder | null;

  const isActive = field === currentSort;

  const newParams = new URLSearchParams(searchParams);

  if (!isActive) {
    newParams.set('sort', field);
    newParams.delete('order');
  } else if (isActive && !currentOrder) {
    newParams.set('order', 'desc');
  } else if (isActive && currentOrder === 'desc') {
    newParams.delete('sort');
    newParams.delete('order');
  }

  function getItemClass(active: boolean, order: SortOrder | null) {
    if (!active) {
      return 'fas fa-sort';
    }

    if (active && !order) {
      return 'fas fa-sort-up';
    }

    if (active && order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  }

  const iconClass = getItemClass(isActive, currentOrder);

  return (
    <Link to={{ search: newParams.toString() }}>
      <span className="icon">
        <i className={iconClass} />
      </span>
    </Link>
  );
};
