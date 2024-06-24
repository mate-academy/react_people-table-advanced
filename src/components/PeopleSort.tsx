import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  sortName: string;
};

export const PeopleSort: React.FC<Props> = ({ sortName }) => {
  const [searchParams] = useSearchParams();

  const sortColumn = searchParams.get('sort') || null;
  const isReversed = searchParams.get('order') || null;

  const sortBy = (columnName: string) => {
    const firstClick = columnName !== sortColumn;
    const secondClick = columnName === sortColumn && !isReversed;
    const thirdClick = columnName === sortColumn && isReversed;

    if (firstClick) {
      return { sort: columnName, order: null };
    }

    if (secondClick) {
      return { sort: columnName, order: 'desc' };
    }

    if (thirdClick) {
      return { sort: null, order: null };
    }

    return { sort: null, order: null };
  };

  const isActive = sortColumn === sortName;

  return (
    <SearchLink params={sortBy(sortName)} aria-label="sorting icon">
      <span className="icon">
        <i
          data-cy="SortIcon"
          className={classNames('fas', {
            'fa-sort': !isActive,
            'fa-sort-up': isActive && !isReversed,
            'fa-sort-down': isActive && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
