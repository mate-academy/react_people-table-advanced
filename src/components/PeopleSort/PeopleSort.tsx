import React from 'react';

import { SortLink } from '../SortLink';

type Props = {
  sortTitle: string;
  sortField: string | null;
  sortOrder: string | null;
};

export const PeopleSort: React.FC<Props> = ({
  sortTitle,
  sortField,
  sortOrder,
}) => {
  const sortText = sortTitle.toLowerCase();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {sortTitle}
        <SortLink
          sortText={sortText}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </span>
    </th>
  );
};
