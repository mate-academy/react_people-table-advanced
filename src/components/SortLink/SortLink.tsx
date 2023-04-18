import { FC } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { SearchLink } from '../SearchLink';
import { getTypeOfSort } from '../../helpers';

type Props = {
  typeOfSort: string | null,
};

export const SortLink: FC<Props> = (props) => {
  const {
    typeOfSort,
  } = props;

  const [searchParams] = useSearchParams();
  const sortType = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const isCurrSortType = typeOfSort === getTypeOfSort(sortType);

  const getSortParams = () => {
    if (!isCurrSortType) {
      return {
        sort: typeOfSort,
        order: null,
      };
    }

    if (!order) {
      return {
        sort: typeOfSort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <SearchLink params={getSortParams()}>
      <span className="icon">
        <i
          className={classNames(
            'fas',
            {
              'fa-sort': !isCurrSortType,
              'fa-sort-up': isCurrSortType && !order,
              'fa-sort-down': isCurrSortType && order,
            },
          )}
        />
      </span>
    </SearchLink>
  );
};
