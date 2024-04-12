import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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
    const row =
      '/people' +
      (sortColumn !== columnName
        ? `?sort=${columnName}`
        : !isReversed
          ? `?sort=${columnName}&order=desc`
          : '');

    return row;
  }

  const getSortIconClass = () => {
    return classNames('fas', {
      'fa-sort': !(sortColumn === columnName),
      'fa-sort-up': sortColumn === columnName && !isReversed,
      'fa-sort-down': sortColumn === columnName && isReversed,
    });
  };

  return (
    <Link to={getSortOrderParams()}>
      <span className="is-flex is-flex-wrap-nowrap">
        <span className="icon">
          <i className={getSortIconClass()} />
        </span>
      </span>
    </Link>
  );
};
