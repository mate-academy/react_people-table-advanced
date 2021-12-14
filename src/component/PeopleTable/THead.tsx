import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';

type Props = {
  handleFilter: (sortBy: string, selectedOrder: string) => void;
  thHeadTitles: string[];
  sortOrder: string;
  sortBy: string;
  thHeadOffFilter: string[];
};

type SortMethod = 'asc' | 'desc' | '';

export const THead: React.FC<Props> = React.memo(({
  handleFilter,
  thHeadTitles,
  sortOrder,
  sortBy,
  thHeadOffFilter,
}) => {
  const [sortMethod, setSortMethod] = useState<SortMethod>('');

  const handleButtonSort = (title: string, selectedSortOrder: SortMethod) => {
    switch (selectedSortOrder) {
      case 'asc':
        handleFilter(title, selectedSortOrder);
        break;

      case 'desc':
      default:
        handleFilter(title, selectedSortOrder);
        break;
    }

    setSortMethod(selectedSortOrder);
  };

  return (
    <thead>
      <tr>
        {
          thHeadTitles.map(th => (
            <th
              scope="col"
              key={th}
              className="table-th-head"
            >
              {
                !thHeadOffFilter.includes(th) ? (
                  <button
                    type="button"
                    className="table-button"
                    onClick={() => handleButtonSort(th.toLowerCase(), sortMethod === ('' || 'desc') ? 'asc' : 'desc')}
                  >
                    <span>{th}</span>
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className={classNames('icon-sort',
                        { 'icon-sort--active': sortBy === th.toLowerCase() && sortOrder === 'desc' })}
                    />
                  </button>
                ) : (
                  <span>{th}</span>
                )
              }

            </th>
          ))
        }
      </tr>
    </thead>
  );
});
