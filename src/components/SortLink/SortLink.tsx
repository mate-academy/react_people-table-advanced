import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils/searchHelper';
import Sort, { URLSearchParam, OrderField } from '../../types/Sort';

type Props = {
  sortField: Sort;
};

const SortLinkBase: React.FC<Props> = ({ sortField }) => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get(URLSearchParam.Sort);
  const orderParam = searchParams.get(URLSearchParam.Order);

  const getSortSearchWith = () => {
    if (sortParam !== sortField) {
      return getSearchWith(searchParams, {
        [URLSearchParam.Sort]: sortField,
        [URLSearchParam.Order]: null,
      });
    }

    if (sortParam === sortField && !orderParam) {
      return getSearchWith(searchParams, {
        [URLSearchParam.Order]: OrderField.Descending,
      });
    }

    if (sortParam === sortField && orderParam) {
      return getSearchWith(searchParams, {
        [URLSearchParam.Sort]: null,
        [URLSearchParam.Order]: null,
      });
    }

    return searchParams.toString();
  };

  return (
    <Link
      to={{
        search: getSortSearchWith(),
      }}
    >
      <span className="icon">
        {sortParam !== sortField && <i className="fas fa-sort" />}
        {sortParam === sortField && !orderParam && (
          <i className="fas fa-sort-up" />
        )}
        {sortParam === sortField && orderParam === 'desc' && (
          <i className="fas fa-sort-down" />
        )}
      </span>
    </Link>
  );
};

export const SortLink = React.memo(SortLinkBase);
