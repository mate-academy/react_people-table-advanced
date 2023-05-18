import { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

interface Props {
  title: string;
}

export const TableHeader: FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const sortValue = title.toLowerCase();

  const getParams = (searchParam: string) => {
    if (sort === null && order === null) {
      return { sort: searchParam, order: null };
    }

    if (sort !== null && order === null) {
      return { sort: searchParam, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title}
      <SearchLink params={getParams(sortValue)}>
        <span className="icon">
          <i className={cn('fas', {
            'fa-sort': (!sort && !order) || sort !== sortValue,
            'fa-sort-up': sort && !order && sort === sortValue,
            'fa-sort-down': sort && order && sort === sortValue,
          })}
          />
        </span>
      </SearchLink>
    </span>
  );
};
