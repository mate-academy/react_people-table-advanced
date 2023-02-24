import classNames from 'classnames';
import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getSearchWithSort } from '../../utils/searchHelper';

type Props = {
  sort: keyof Person,
};

export const SortLink: FC<Props> = ({ sort }) => {
  const [searchParams] = useSearchParams();
  const isCurrentSorField = searchParams.get('sort') === sort;
  const isReversed = searchParams.get('order') === 'desc';

  return (
    <Link
      to={{
        search: getSearchWithSort(
          searchParams,
          sort,
          isCurrentSorField,
          isReversed,
        ),
      }}
    >
      <span className="icon">
        <i
          className={classNames(
            'fas',
            { 'fa-sort': !isCurrentSorField },
            { 'fa-sort-up': isCurrentSorField && !isReversed },
            { 'fa-sort-down': isCurrentSorField && isReversed },
          )}
        />
      </span>
    </Link>
  );
};
