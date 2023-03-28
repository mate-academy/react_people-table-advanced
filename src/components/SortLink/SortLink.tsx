import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SortType } from '../../enums/SortType';
import { getSortType } from '../../helpers/getSortType';
import { SearchLink } from '../SearchLink';

type Props = {
  initialSortType: SortType | null;
};

export const SortLink: React.FC<Props> = ({ initialSortType }) => {
  const [searchParams] = useSearchParams();

  const sortType = searchParams.get('sort') || SortType.None;
  const order = searchParams.get('order') || '';

  const isCurrentSortType = getSortType(sortType) === initialSortType;

  window.console.log(`initial: ${initialSortType}`);

  // const params = {
  //   sort: getSortType(sortType),
  //   order: !isReversedOrder
  //     ? 'desc'
  //     : null,
  // };

  const params = {
    sort:
      isCurrentSortType || (isCurrentSortType && !order)
        ? initialSortType
        : null,
    order: isCurrentSortType && !order ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': true,
            // 'fa-sort-up': isCurrentSortType && !isReversedOrder,
            // 'fa-sort-down': isCurrentSortType && isReversedOrder,
            'fa-sort-up': isCurrentSortType && !order,
            'fa-sort-down': isCurrentSortType && order === 'desc',
          })}
        />
      </span>
    </SearchLink>
  );
};
