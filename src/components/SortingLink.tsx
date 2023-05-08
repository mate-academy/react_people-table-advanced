import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SortingCell } from '../types/sortingCell';
import { DESC_ORDER } from '../constants';

type Props = {
  cellType: SortingCell;
};

export const SortingLink: FC<Props> = ({ cellType }) => {
  const [searchParams] = useSearchParams();
  const sortOption = searchParams.get('sort');
  const isOrderReversed = searchParams.get('order') === DESC_ORDER;
  const isCellSorted = sortOption === cellType.toLowerCase();

  const params = {
    sort: (isCellSorted && isOrderReversed) ? null : cellType.toLowerCase(),
    order: (isCellSorted && !isOrderReversed) ? DESC_ORDER : null,
  };

  return (
    <SearchLink
      params={params}
    >
      <span
        className="icon"
      >
        <i className={classNames(
          'fas',
          {
            'fa-sort': !isCellSorted,
            'fa-sort-up': isCellSorted && !isOrderReversed,
            'fa-sort-down': isCellSorted && isOrderReversed,
          },
        )}
        />
      </span>
    </SearchLink>
  );
};
