import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import { SearchParamsContext } from '../SearchParamsContext';

type Props = {
  name: string,
};

export const SortTypeLink: React.FC<Props> = ({ name }) => {
  const { searchParams } = useContext(SearchParamsContext);
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const nameLowercased = name.toLowerCase();
  const isCurrentSortType = sort === nameLowercased;

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {name}
      <Link
        to={{
          search: getSearchWith(
            searchParams,
            {
              sort: isCurrentSortType && order
                ? null : nameLowercased,
              order: isCurrentSortType && !order
                ? 'desc' : null,
            },
          ),
        }}
      >
        <span className="icon">
          <i
            className={classNames(
              'fas',
              { 'fa-sort': !isCurrentSortType },
              { 'fa-sort-up': isCurrentSortType && !order },
              { 'fa-sort-down': isCurrentSortType && order },
            )}
          />
        </span>
      </Link>
    </span>
  );
};
