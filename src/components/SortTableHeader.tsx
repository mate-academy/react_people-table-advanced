import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import SearchParam from '../constants/searchParam';
import { SortBy } from '../constants/SortBy';
import { Order } from '../constants/Order';

interface Props {
  sortQuery: SortBy,
  children: React.ReactNode;
}

export const SortTableHeader: React.FC<Props> = ({ sortQuery, children }) => {
  const [serachParams] = useSearchParams();
  const currentOrder = serachParams.get(SearchParam.Order);
  const currentSort = serachParams.get(SearchParam.Sort);

  const getSearchPath = () => {
    let appliedSort: SortBy | null = sortQuery;
    let appliedOrder: Order | null = null;

    if (currentSort === sortQuery && currentOrder === null) {
      appliedOrder = Order.Desc;
    } else if (currentSort !== sortQuery) {
      appliedOrder = null;
    } else {
      appliedSort = null;
      appliedOrder = null;
    }

    const newParams = {
      [SearchParam.Sort]: appliedSort,
      [SearchParam.Order]: appliedOrder,
    };

    const newParamsString = getSearchWith(serachParams, newParams);

    return { search: newParamsString };
  };

  const iconClasses = classNames(
    'fas',
    {
      'fa-sort': currentSort !== sortQuery,
      'fa-sort-up': currentSort === sortQuery && currentOrder === null,
      'fa-sort-down': currentSort === sortQuery && currentOrder === Order.Desc,
    },
  );

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {children}
        <Link to={getSearchPath()}>
          <span className="icon">
            <i className={iconClasses} />
          </span>
        </Link>
      </span>
    </th>
  );
};
