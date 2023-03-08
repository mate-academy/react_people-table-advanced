import classNames from 'classnames';
import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWithSort } from '../utils/searchHelper';

type Props = {
  sortLine: keyof Person,
};

export const SortPeopleLink: FC<Props> = ({ sortLine }) => {
  const [searchParams] = useSearchParams();
  const isCurrentParam = searchParams.get('sort') === sortLine;
  const isReversed = searchParams.get('order') === 'desc';

  return (
    <Link
      to={{
        search: getSearchWithSort(
          searchParams,
          sortLine,
          isCurrentParam,
          isReversed,
        ),
      }}
    >
      <span className="icon">
        <i
          className={classNames(
            'fas',
            { 'fa-sort': !isCurrentParam && !isReversed },
            { 'fa-sort-up': isCurrentParam && !isReversed },
            { 'fa-sort-down': isCurrentParam && isReversed },
          )}
        />
      </span>
    </Link>
  );
};
