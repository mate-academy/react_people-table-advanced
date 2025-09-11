import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SortField } from '../../types/Filters';

type Props = {
  field: SortField;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const isActive = currentSort === field;

  const newParams = new URLSearchParams(searchParams);

  if (!isActive) {
    newParams.set('sort', field);
  } else if (isActive && !currentOrder) {
    newParams.set('order', 'desc');
  } else if (isActive && currentOrder) {
    newParams.delete('sort');
    newParams.delete('order');
  }

  let iconClass = 'fas fa-sort';

  if (isActive && !currentOrder) {
    iconClass = 'fas fa-sort-up';
  }

  if (isActive && currentOrder === 'desc') {
    iconClass = 'fas fa-sort-down';
  }

  return (
    <Link to={{ search: newParams.toString() }}>
      <span className="icon">
        <i className={iconClass} />
      </span>
    </Link>
  );
};

export default SortLink;
