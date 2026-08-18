import React from 'react';
import { SearchLink } from '../SearchLink';
import { useLocation } from 'react-router-dom';
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
  const { state } = useLocation();

  console.log('render SortLink');

  if (sortOrder === 'desc' && sortField !== sortType && sortField === state) {
    return (
      <SearchLink params={{ sort: sortType, order: null }} state={sortField}>
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      </SearchLink>
    );
  }

  if (sortOrder === 'desc' && sortField === sortType) {
    return (
      <SearchLink params={{ sort: null, order: null }} state={sortField}>
        <span className="icon">
          <i className="fas fa-sort-down" />
        </span>
      </SearchLink>
    );
  }

  if (sortOrder === null && sortField === sortType) {
    return (
      <SearchLink params={{ sort: sortType, order: 'desc' }} state={sortField}>
        <span className="icon">
          <i className="fas fa-sort-up" />
        </span>
      </SearchLink>
    );
  }

  return (
    <SearchLink params={{ sort: sortType }} state={sortField}>
      <span className="icon">
        <i className="fas fa-sort" />
      </span>
    </SearchLink>
  );
};
