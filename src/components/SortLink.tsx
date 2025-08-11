import cn from 'classnames';
import { FC } from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

interface Props {
  columnName: string;
}

export const SortLink: FC<Props> = ({ columnName }) => {
  const [searchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') || null;
  const isReversed = searchParams.get('order') || null;

  const sortBy = (nameOfColumn: string) => {
    const firstClick = nameOfColumn !== sortColumn;
    const secondClick = nameOfColumn === sortColumn && !isReversed;
    const thirdClick = nameOfColumn === sortColumn && isReversed;

    if (firstClick) {
      return { sort: nameOfColumn, order: null };
    }

    if (secondClick) {
      return { sort: nameOfColumn, order: 'desc' };
    }

    if (thirdClick) {
      return { sort: null, order: null };
    }

    return { sort: null, order: null };
  };

  const isActive = sortColumn === columnName;

  return (
    <SearchLink params={sortBy(columnName)} aria-label="sorting icon">
      <span className="icon">
        <i
          data-cy="SortIcon"
          className={cn('fas', {
            'fa-sort': !isActive,
            'fa-sort-up': isActive && !isReversed,
            'fa-sort-down': isActive && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
