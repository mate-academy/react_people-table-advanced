import React from 'react';
import { SortBy, SortOrder } from '../../types';

type Props = {
  title: string,
  sortBy: SortBy,
  selectedSortBy: SortBy | null,
  selectedSortOrder: SortOrder,
  handleSortByChange: (sortBy: SortBy) => void,
};

export const SortableColumnName: React.FC<Props> = ({
  title,
  sortBy,
  selectedSortBy,
  selectedSortOrder,
  handleSortByChange,
}) => {
  return (
    <div className="level">
      {title}
      <button
        type="button"
        className="button is-ghost is-small"
        onClick={() => {
          handleSortByChange(sortBy);
        }}
      >
        {selectedSortBy !== sortBy
          ? (
            <img src="/react_people-table-advanced/images/sort_both.png" alt="sort" />
          )
          : (
            <img
              src={`/react_people-table-advanced/images/sort_${selectedSortOrder}.png`}
              alt={`sort-${selectedSortOrder}`}
            />
          )}
      </button>
    </div>
  );
};
