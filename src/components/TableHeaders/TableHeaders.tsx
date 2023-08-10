import React from 'react';
import cn from 'classnames';
import { tableHeaders } from '../../utils/tableHeaders';
import { SearchLink } from '../../utils/SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type Props = {
  sort: string,
  order: string,
  onSortBy: (sortType: string) => SearchParams,
};

export const TableHeaders: React.FC<Props> = ({
  sort,
  order,
  onSortBy,
}) => {
  return (
    <tr>
      {tableHeaders.map(header => (
        <th key={header}>
          {header}
          <SearchLink
            params={onSortBy(header.toLowerCase())}
            hidden={header === 'Mother' || header === 'Father'}
          >
            <span
              className="icon"
            >
              <i
                className={cn('fas', {
                  'fa-sort-up': header.toLowerCase() === sort && order === '',
                  'fa-sort-down': header.toLowerCase() === sort
                    && order === 'desc',
                  'fa-sort': header.toLowerCase() !== sort,
                })}
              />
            </span>
          </SearchLink>
        </th>
      ))}
    </tr>
  );
};
