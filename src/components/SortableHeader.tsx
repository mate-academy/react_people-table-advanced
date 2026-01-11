import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  label: string;
  field: string;
};

export const SortableHeader: React.FC<Props> = ({ label, field }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getNextSortParams = () => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {label}
      <Link
        to={{
          search: getSearchWith(searchParams, getNextSortParams()),
        }}
        className="icon"
      >
        <i
          className={classNames('fas', {
            'fa-sort': sort !== field,
            'fa-sort-up': sort === field && order !== 'desc',
            'fa-sort-down': sort === field && order === 'desc',
          })}
        />
      </Link>
    </span>
  );
};
