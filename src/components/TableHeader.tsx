import React from 'react';
import { SortLink } from './SortLink';

type Props = {
  columnName: string;
  sortColumn: string;
  isReversed: boolean;
  sortParam: string | null;
};

export const TableHeader: React.FC<Props> = ({
  columnName,
  sortColumn,
  isReversed,
  sortParam,
}) => (
  <span className="is-flex is-flex-wrap-nowrap">
    {columnName}
    {sortParam && (
      <SortLink
        columnName={sortParam}
        sortColumn={sortColumn}
        isReversed={isReversed}
      />
    )}
  </span>
);
