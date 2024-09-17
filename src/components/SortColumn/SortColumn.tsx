import { useSortParams } from '../../hooks/useSortParams';

import { SearchLink } from '../SearchLink';
import { SortIcon } from '../SortIcon';

type SortParams = {
  [key: string]: string | null;
};

type Props = {
  column: string;
};

export const SortColumn: React.FC<Props> = ({ column }) => {
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
