import React from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  columnName: string;
  sortColumn: string;
  isReversed: boolean;
};

export const SortLink: React.FC<Props> = ({
  columnName,
  sortColumn,
  isReversed,
}) => {
  function getSortOrderParams() {
    if (sortColumn !== columnName) {
      return { sort: columnName, order: null };
    }

    if (isReversed) {
      return { sort: null, order: null };
    }

    return { sort: columnName, order: 'desc' };
  }

  const getSortIconClass = () => {
    return classNames('fas', {
      'fa-sort': !(sortColumn === columnName),
      'fa-sort-up': sortColumn === columnName && !isReversed,
      'fa-sort-down': sortColumn === columnName && isReversed,
    });
  };

  return (
    <SearchLink params={getSortOrderParams()}>
      <span className="is-flex is-flex-wrap-nowrap">
        <span className="icon">
          <i className={getSortIconClass()} />
        </span>
      </span>
    </SearchLink>
  );
};
