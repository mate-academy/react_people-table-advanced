import React from 'react';
import classNames from 'classnames';
import { Sort } from '../types/Sort';

type Props = {
  sortType: Sort,
  sort: string | null,
  order: string | null,
};

export const SearchLinkChildren: React.FC<Props> = ({
  sortType,
  sort,
  order,
}) => (
  <span className="icon">
    <i className={classNames(
      'fas',
      { 'fa-sort': sort !== sortType },
      { 'fa-sort-up': sort === sortType && !order },
      { 'fa-sort-down': sort === sortType && order },
    )}
    />
  </span>
);
