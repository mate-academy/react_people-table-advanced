import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface Props {
  param: keyof Person;
}

type SortParams = {
  sort: keyof Person | null;
  order: 'desc' | null;
};

export const SortParam: React.FC<Props> = ({ param }) => {
  const title = param.charAt(0).toUpperCase() + param.slice(1);
  const [searchParams] = useSearchParams();

  const appliedSort = searchParams.get('sort') || null;
  const appliedOrder = searchParams.get('order') || null;

  const handleSortClick = (sortType: keyof Person) => {
    const currentParams: SortParams = {
      sort: null,
      order: null,
    };

    if (appliedSort !== param) {
      currentParams.sort = sortType;

      return currentParams;
    }

    if (appliedSort === sortType && !appliedOrder) {
      currentParams.sort = sortType;
      currentParams.order = 'desc';

      return currentParams;
    }

    return currentParams;
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink params={handleSortClick(param)}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': appliedSort !== param,
                'fa-sort-up': appliedSort === param && !appliedOrder,
                'fa-sort-down': appliedSort === param && appliedOrder,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
