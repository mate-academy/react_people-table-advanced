import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  title: string,
  sortType: string,
};

export const ColumnTitle: FC<Props> = ({
  title,
  sortType,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title}
      <SearchLink
        params={{
          sort: (!sort && sortType)
          || (sort !== sortType && sortType)
          || (sort && !order && sortType)
          || (sort && order && null),
          order: (sort === sortType ? 'desc' : null),
        }}
      >
        <span className="icon">
          <i className={classNames(
            'fas',
            {
              'fa-sort': sort !== sortType,
              'fa-sort-up': sort === sortType && !order,
              'fa-sort-down': (order === 'desc' && sort === sortType),
            },
          )}
          />
        </span>
      </SearchLink>
    </span>
  );
};
