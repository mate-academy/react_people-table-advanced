import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export type Props = {
  entry: [key: string, value: string],
};

export const SortLink: FC<Props> = ({ entry }) => {
  const [key, value] = entry;
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const sortDirect = (sortParam === value) && !orderParam;
  const sortReverse = sortParam === value && orderParam;

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {key}
      <SearchLink
        params={{
          sort: (sortReverse) ? null : value,
          order: (sortDirect) ? 'desc' : null,
        }}
      >
        <span className="icon">
          <i
            className={classNames('fas fa-sort',
              { 'fa-sort-up': sortDirect },
              { 'fa-sort-down': sortReverse })}
          />
        </span>
      </SearchLink>
    </span>
  );
};
