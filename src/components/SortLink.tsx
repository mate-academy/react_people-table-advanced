import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SortType } from '../enums/SortType';
import { getSortType } from '../helpers/getSortType';
import { SearchLink } from './SearchLink';

type Props = {
  initialSortType: SortType | null;
};

export const SortLink: React.FC<Props> = ({ initialSortType }) => {
  const [searchParams] = useSearchParams();

  const sortType = searchParams.get('sort') || SortType.None;
  const order = searchParams.get('order') || '';
  const isCurrentSortType = getSortType(sortType) === initialSortType;

  const getParams = (() => {
    if (!isCurrentSortType) {
      return {
        sort: initialSortType,
        order: null,
      };
    }

    if (!order) {
      return {
        sort: initialSortType,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  })();

  return (
    <SearchLink params={getParams}>
      <span className="icon">
        <i
          className={classNames(
            'fas',
            {
              'fa-sort': !isCurrentSortType,
              'fa-sort-up': isCurrentSortType && !order,
              'fa-sort-down': isCurrentSortType && order,
            },
          )}
        />
      </span>
    </SearchLink>
  );
};
