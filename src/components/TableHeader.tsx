import React from 'react';
import classNames from 'classnames';
import { SortHeaderCells } from '../types/SortHeaderCells';
import { SearchLink } from './SearchLink';

interface Props {
  sort: string;
  order: string;
}

export const TableHeader: React.FC<Props> = ({ sort, order }) => {
  const sortCells = [
    SortHeaderCells.Name,
    SortHeaderCells.Sex,
    SortHeaderCells.Born,
    SortHeaderCells.Died,
  ];

  return (
    <thead>
      <tr>
        {sortCells.map(cellName => {
          const normilezedCellName = cellName.toLowerCase();

          return (
            <th key={cellName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {cellName}
                <SearchLink
                  params={{
                    sort: sort === normilezedCellName && order
                      ? null
                      : normilezedCellName,
                    order: sort === normilezedCellName && !order
                      ? 'desc'
                      : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== normilezedCellName,
                        'fa-sort-up': sort === normilezedCellName && !order,
                        'fa-sort-down': sort === normilezedCellName && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          );
        })}

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
}
