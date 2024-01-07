import { memo } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../../SearchLink/SearchLink';
import { makeSortObject } from '../../../../utils/makeSortObject';
import { TableHead } from '../../../../types/table-head';

interface Props {
  cell: TableHead,
}

export const TableHeadInfo: React.FC<Props> = memo(({ cell }) => {
  const { data, isSorted } = cell;
  const [sortParams] = useSearchParams();

  const hasUpArrow = data === sortParams.get('sort');
  const hasrDownArrow = data === sortParams.get('sort')
                      && sortParams.has('order');
  const hasDefaultIcon = !hasUpArrow && !hasrDownArrow;

  const sortOrder = makeSortObject(sortParams, data);

  return (
    <th>
      {isSorted
        ? (
          <span className="is-flex is-flex-wrap-nowrap">
            {data}
            <SearchLink params={{ ...sortOrder }}>
              <span className="icon">
                <i
                  className={cn({
                    'fas fa-sort': hasDefaultIcon,
                    'fas fa-sort-up': hasUpArrow && !hasrDownArrow,
                    'fas fa-sort-down': hasrDownArrow && hasUpArrow,
                  })}
                />

              </span>
            </SearchLink>
          </span>
        ) : (
          <p>{data}</p>
        )}
    </th>
  );
});
