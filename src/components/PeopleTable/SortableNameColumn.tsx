import React from 'react';
import { SearchLink } from '../SearchLink';

interface Props {
  columnName: string;
  sortBy: string;
  currentSort: string;
  currentOrder: string;
}

export const SortableNameColumn: React.FC<Props> = ({
  columnName,
  sortBy,
  currentSort,
  currentOrder,
}) => {
  if (currentSort === '') {
    return (
      <span className="is-flex is-flex-wrap-nowrap">
        {columnName}
        <SearchLink params={{ sort: sortBy, order: null }}>
          <span className="icon">
            <i className="fas fa-sort" />
          </span>
        </SearchLink>
      </span>
    );
  }

  if (currentOrder === '' && sortBy === currentSort) {
    return (
      <span className="is-flex is-flex-wrap-nowrap">
        {columnName}
        <SearchLink params={{ sort: sortBy, order: 'desc' }}>
          <span className="icon">
            <i className="fas fa-sort-up" />
          </span>
        </SearchLink>
      </span>
    );
  }

  if (currentOrder !== '' && sortBy === currentSort) {
    return (
      <span className="is-flex is-flex-wrap-nowrap">
        {columnName}
        <SearchLink params={{ order: null, sort: null }}>
          <span className="icon">
            <i className="fas fa-sort-down" />
          </span>
        </SearchLink>
      </span>
    );
  }

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {columnName}
      <SearchLink params={{ sort: sortBy, order: null }}>
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      </SearchLink>
    </span>
  );
};
