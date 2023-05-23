import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  name: string;
}

export const TableHeader: FC<Props> = ({ name }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const tableHeadName = name.toLowerCase();

  const getSearchParams = (searchParam: string) => {
    if (searchParam === sort && !order) {
      return { sort: searchParam, order: 'desc' };
    }

    if (searchParam === sort && order) {
      return { sort: null, order: null };
    }

    return { sort: searchParam, order: null };
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {name}
        <SearchLink params={getSearchParams(tableHeadName)}>
          <span className="icon">
            <i className={classNames('fas',
              { 'fa-sort': sort !== tableHeadName },
              { 'fas fa-sort-up': sort === tableHeadName && !order },
              { 'fas fa-sort-down': sort === tableHeadName && order })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
