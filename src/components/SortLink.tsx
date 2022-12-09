import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  title: string;
};

export const SortLink:FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';
  const isUnsort = title === sortField && isReversed;
  const isSortReverse = title === sortField && !isReversed;

  return (
    <SearchLink
      params={{
        sort: isUnsort ? null : title,
        order: isSortReverse ? 'desc' : null,
      }}
    >
      <span className="icon">
        <i className={classNames('fas', {
          'fa-sort': sortField !== title,
          'fa-sort-up': isSortReverse,
          'fa-sort-down': isUnsort,
        })}
        />
      </span>
    </SearchLink>
  );
};
