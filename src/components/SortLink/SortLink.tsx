import React from 'react';
import { SearchLink } from '../SearchLink';
import { SortType } from '../../types';

type Props = {
  sortType: SortType;
  sortField: string | null;
  sortOrder: string | null;
};

export const SortLink: React.FC<Props> = ({
  sortType,
  sortField,
  sortOrder,
}) => {
  const isActive = sortType === sortField;

  if (!isActive) {
    return (
      <SearchLink params={{ sort: sortType, order: null }}>
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      </SearchLink>
    );
  }

  if (sortOrder !== 'desc') {
    return (
      <SearchLink params={{ order: 'desc' }}>
        <span className="icon">
          <i className="fas fa-sort-up" />
        </span>
      </SearchLink>
    );
  }

  return (
    <SearchLink params={{ sort: null, order: null }}>
      <span className="icon">
        <i className="fas fa-sort-down" />
      </span>
    </SearchLink>
  );
};
