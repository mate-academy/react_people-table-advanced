import React from 'react';
import { SearchLink } from '../SearchLink';

type Props = {
  sortText: string;
  sortField: string | null;
  sortOrder: string | null;
};

export const SortLink: React.FC<Props> = ({
  sortText,
  sortField,
  sortOrder,
}) => {
  if (sortOrder === 'desc' && sortField === sortText) {
    return (
      <SearchLink params={{ sort: null, order: null }}>
        <span className="icon">
          <i className="fas fa-sort-down" />
        </span>
      </SearchLink>
    );
  }

  if (sortOrder === null && sortField === sortText) {
    return (
      <SearchLink params={{ sort: `${sortText}`, order: 'desc' }}>
        <span className="icon">
          <i className="fas fa-sort-up" />
        </span>
      </SearchLink>
    );
  }

  return (
    <SearchLink params={{ sort: `${sortText}` }}>
      <span className="icon">
        <i className="fas fa-sort" />
      </span>
    </SearchLink>
  );
};
