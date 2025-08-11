import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  field: string;
  label: string;
};

export const SortHeader: React.FC<Props> = ({ field, label }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const isSorted = currentSort === field;
  const isDesc = isSorted && currentOrder === 'desc';

  const handleClick = () => {
    let newParams = {};

    if (!isSorted) {
      newParams = { sort: field, order: null };
    } else if (!isDesc) {
      newParams = { sort: field, order: 'desc' };
    } else {
      newParams = { sort: null, order: null };
    }

    navigate({ search: getSearchWith(searchParams, newParams) });
  };

  const icon = !isSorted
    ? 'fas fa-sort'
    : isDesc
      ? 'fas fa-sort-down'
      : 'fas fa-sort-up';

  return (
    <span
      className="is-clickable is-flex is-align-items-center"
      onClick={handleClick}
    >
      {label}
      <span className="icon is-small ml-1">
        <i className={icon} />
      </span>
    </span>
  );
};
