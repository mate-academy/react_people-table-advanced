import cn from 'classnames';
import React from 'react';
import { SortTypes } from '../../types/SortTypes';

type Props = {
  sortType: SortTypes
  sort: string,
  isReversed: boolean,
};

export const SortIcon: React.FC<Props> = ({
  sort,
  isReversed,
  sortType,
}) => (
  <span className="icon">
    <i
      className={cn('fas', {
        'fa-sort': sort !== sortType,
        'fa-sort-up': sort === sortType && !isReversed,
        'fa-sort-down': sort === sortType && isReversed,
      })}
    />
  </span>
);
