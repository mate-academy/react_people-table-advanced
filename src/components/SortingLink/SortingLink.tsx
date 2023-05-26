import { Link } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { getSortingInfo } from '../../utils/peopleSorter';
import { SortType } from '../../types/SortType';

interface Props {
  sortType : SortType,
  selectedSortType: SortType,
  order: string | null,
  searchParams: URLSearchParams;
}

export const SortingLink: React.FC<Props> = ({
  sortType,
  selectedSortType,
  order,
  searchParams,
}) => {
  const formattedSortType = sortType[0].toUpperCase()
    + sortType.slice(1);

  const {
    sortingParams,
    clicks,
  } = getSortingInfo(selectedSortType, sortType, order);

  return (
    <th key={sortType}>
      <span className="is-flex is-flex-wrap-nowrap">
        {formattedSortType}
        <Link to={{
          search: getSearchWith(searchParams, sortingParams),
        }}
        >
          <span className="icon">
            <i className={cn('fas',
              { 'fa-sort': clicks === 1 },
              { 'fa-sort-up': clicks === 2 },
              { 'fa-sort-down': clicks === 3 })}
            />
          </span>
        </Link>
      </span>
    </th>
  );
};
