import React from 'react';
import { SearchLink } from '../SearchLink';
import { useLocation } from 'react-router-dom';

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
  const { state } = useLocation();

  // console.log('state = ', state);
  // console.log('sortField = ', sortField);

  if (sortOrder === 'desc' && sortField !== sortText && sortField === state) {
    return (
      <SearchLink params={{ sort: sortText, order: null }} state={sortField}>
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      </SearchLink>
    );
  }

  if (sortOrder === 'desc' && sortField === sortText) {
    return (
      <SearchLink params={{ sort: null, order: null }} state={sortField}>
        <span className="icon">
          <i className="fas fa-sort-down" />
        </span>
      </SearchLink>
    );
  }

  if (sortOrder === null && sortField === sortText) {
    return (
      <SearchLink
        params={{ sort: `${sortText}`, order: 'desc' }}
        state={sortField}
      >
        <span className="icon">
          <i className="fas fa-sort-up" />
        </span>
      </SearchLink>
    );
  }

  return (
    <SearchLink params={{ sort: `${sortText}` }} state={sortField}>
      <span className="icon">
        <i className="fas fa-sort" />
      </span>
    </SearchLink>
  );
};
