import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  nameOfColumn: string;
  sortBy: string;
  sortOrder: string;
  searchParams: URLSearchParams;
}

export const ColumnHead: FC<Props> = ({
  nameOfColumn,
  sortBy,
  sortOrder,
  searchParams,
}) => {
  const lowerCasedName = nameOfColumn.toLowerCase();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {nameOfColumn}
        <Link
          to={{
            search: getSearchWith(searchParams, {
              sort: (sortBy === lowerCasedName && sortOrder)
                ? null
                : lowerCasedName,
              order: (sortBy === lowerCasedName && !sortOrder)
                ? 'desc'
                : null,
            }),
          }}
        >
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': sortBy !== lowerCasedName,
                'fa-sort-up': !sortOrder && sortBy === lowerCasedName,
                'fa-sort-down': sortOrder === 'desc'
                  && sortBy === lowerCasedName,
              })}
            />
          </span>
        </Link>
      </span>
    </th>
  );
};
