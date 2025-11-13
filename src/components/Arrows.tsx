import React from 'react';

interface ArrowsProps {
  sort: string | null;
  order: string | null;
  field: string;
}

export const Arrows: React.FC<ArrowsProps> = ({ sort, order, field }) => {
  if (sort && sort === field && !order) {
    return (
      <span className="icon">
        <i className="fas fa-sort-up" />
      </span>
    );
  }

  if (sort && sort === field && order === 'desc') {
    return (
      <span className="icon">
        <i className="fas fa-sort-down" />
      </span>
    );
  }

  return (
    <span className="icon">
      <i className="fas fa-sort" />
    </span>
  );
};
