import React from 'react';
import { getSortParams } from '../../utils/sortHelper';
import { SearchLink } from './SearchLink';
import { TableIcon } from './TableIcon';

interface Props {
  searchParams: URLSearchParams,
  columnName: string,
}

export const TableLabel: React.FC<Props> = React.memo(
  ({ searchParams, columnName }) => {
    const sort = columnName.toLowerCase();

    return (
      <span className="is-flex is-flex-wrap-nowrap">
        {columnName}
        <SearchLink
          params={getSortParams(searchParams, sort)}
        >
          <TableIcon searchParams={searchParams} sort={sort} />
        </SearchLink>
      </span>
    );
  },
);
