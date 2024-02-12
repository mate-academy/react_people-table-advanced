import React from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SORT_CELLS as cells } from '../constants/searchConsts';

interface Props {
  sort: string;
  order: string;
}

export const TableHeader: React.FC<Props> = ({ sort, order }) => {
  return (
    <thead>
      <tr>
        {cells.map(cellName => {
          return (
            <th key={cellName}>
              <span className="is-flex is-flex-wrap-nowrap is-capitalized">
                {cellName}
                <SearchLink
                  params={{
                    sort: sort === cellName && order
                      ? null
                      : cellName,
                    order: sort === cellName && !order
                      ? 'desc'
                      : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== cellName,
                        'fa-sort-up': sort === cellName && !order,
                        'fa-sort-down': sort === cellName && order,
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
};
