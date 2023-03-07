import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SortTypses } from '../../types/SortTypes';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  name: string;
  sortType: SortTypses;
};

export const HeaderLink: React.FC<Props> = ({ name, sortType }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getHeaderUrl = () => {
    if (sort !== sortType) {
      return getSearchWith(searchParams, { sort: sortType, order: null });
    }

    if (sort === sortType && !order) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: null, order: null });
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {name}
        <Link
          to={{ search: getHeaderUrl() }}
        >
          <span className="icon">
            <i className={classNames(
              'fas',
              {
                'fa-sort': sort !== sortType,
                'fa-sort-up': sort === sortType && !order,
                'fa-sort-down': sort === sortType && order,
              },
            )}
            />
          </span>
        </Link>
      </span>
    </th>
  );
};
