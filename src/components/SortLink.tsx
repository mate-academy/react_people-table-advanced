import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Column } from '../types/Column';
import { SearchLink } from './SearchLink';

type Props = {
  columnName: Column,
};

export const SortLink: React.FC<Props> = ({ columnName }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as Column;
  const order = searchParams.get('order');

  function sortBy(newSortType: string) {
    const firstClick = newSortType !== sort;
    const secondClick = newSortType === sort && order === 'asc';

    if (firstClick) {
      return {
        sort: newSortType,
        order: 'asc',
      };
    }

    if (secondClick) {
      return {
        sort: newSortType,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  }

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {columnName}
        <SearchLink
          params={sortBy(columnName)}
        >
          <span className="icon">
            <i
              data-cy="SortIcon"
              className={classNames('fas', {
                'fa-sort': sort !== columnName,
                'fa-sort-up': sort === columnName && order === 'asc',
                'fa-sort-down': sort === columnName && order === 'desc',
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
