import React from 'react';
import { SortType } from './../../types';
import { SortTypeKey } from './../../types';

import { SortLink } from './../SortLink';

type Props = {
  sortType: SortType;
  sortTitle: SortTypeKey;
  sortField: string | null;
  sortOrder: string | null;
};

// eslint-disable-next-line react/display-name
export const PeopleSort: React.FC<Props> = React.memo(
  ({ sortType, sortTitle, sortField, sortOrder }) => {
    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          {sortTitle}
          <SortLink
            sortType={sortType}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </span>
      </th>
    );
  },
);
