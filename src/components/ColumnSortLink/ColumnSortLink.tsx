import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { addSortParams } from '../../utils/helpers';

type Props = {
  columnName: string;
};

export const ColumnSortLink: React.FC<Props> = ({ columnName }) => {
  const [searchParams] = useSearchParams();

  const isCurrentSortParam = searchParams.get('sort') === columnName;
  const isNoOrderParam = isCurrentSortParam && !searchParams.get('order');
  const isOrderParam = (
    searchParams.get('sort') === columnName && searchParams.get('order')
  );

  return (
    <>
      <Link to={{ search: addSortParams(columnName, searchParams) }}>
        <span className="icon">
          <i className={classNames(
            'fas',
            { 'fa-sort': !isCurrentSortParam },
            { 'fa-sort-up': isNoOrderParam },
            { 'fa-sort-down': isOrderParam },
          )}
          />
        </span>
      </Link>
    </>
  );
};
