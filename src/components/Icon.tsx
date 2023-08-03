import React from 'react';
import classNames from 'classnames';
import { SortDirection, SortType } from '../types';

type Props = {
  sortType: SortType;
  order: SortDirection;
  name: SortType;
};

export const Icon: React.FC<Props> = ({ sortType, order, name }) => {
  return (
    <span className="icon">
      <i className={classNames('fas', {
        'fa-sort': sortType !== name,
        'fa-sort-up': order === SortDirection.ASC && sortType === name,
        'fa-sort-down': order === SortDirection.DESC && sortType === name,
      })}
      />
    </span>
  );
};
