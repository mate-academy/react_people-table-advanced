/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { SearchLink } from './SearchLink';

type Props = {
  sort: string;
  currentSort: string;
  order: boolean;
};

export const SortSelector: React.FC<Props> = ({ sort, currentSort, order }) => {
  const { style, search } =
    currentSort === sort
      ? order
        ? {
            style: 'fa-sort-down',
            search: { sort: null, order: null },
          }
        : {
            style: 'fa-sort-up',
            search: { sort, order: 'desc' },
          }
      : {
          style: 'fa-sort',
          search: { sort, order: null },
        };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {sort[0].toUpperCase() + sort.slice(1)}
        <SearchLink params={search}>
          <span className="icon">
            <i className={`fas ${style}`} />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
