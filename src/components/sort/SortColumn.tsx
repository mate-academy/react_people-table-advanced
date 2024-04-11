import { FC } from 'react';
import { useSortParams } from '../../utils/';
import { SearchLink } from '../';
import { SortIcon } from './';

interface Props {
  column: string;
}

type SortParams = {
  [key: string]: string | null;
};

export const SortColumn: FC<Props> = ({ column }) => {
  const { sortParam, orderParam } = useSortParams();

  const generateSortParams = (field: string): SortParams => {
    const firstClick = sortParam !== field;
    const secondClick = sortParam === field && !orderParam;
    const thirdClick = sortParam === field && orderParam;

    if (firstClick) {
      return { sort: field, order: null };
    }

    if (secondClick) {
      return { order: 'desc' };
    }

    if (thirdClick) {
      return { sort: null, order: null };
    }

    return {};
  };

  const capitalizedColumn = column.charAt(0).toUpperCase() + column.slice(1);

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {capitalizedColumn}
        <SearchLink params={generateSortParams(column)}>
          <SortIcon column={column} />
        </SearchLink>
      </span>
    </th>
  );
};
