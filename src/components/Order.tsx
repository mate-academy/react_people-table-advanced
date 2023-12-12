import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type OrderControlProps = {
  sortBy: string | null;
};

export const OrderControl = ({ sortBy }: OrderControlProps) => {
  const [searchParams] = useSearchParams();
  const currentSortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('sortOrder');

  enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

const getSearchParams = () => {
  let nextSortOrder: SortOrder | null = SortOrder.ASC;

  if (currentSortBy === sortBy) {
    nextSortOrder = sortOrder === SortOrder.ASC ? SortOrder.DESC : null;
  }

  return {
    sort: nextSortOrder null : sortBy,
    sortOrder: nextSortOrder,
  };
};

  return (
    <SearchLink params={getSearchParams()}>
      <span className="icon">
        <i
          className={cn('fas fa-sort', {
            'fa-sort-up': currentSortBy === sortBy && sortOrder === 'ASC',
            'fa-sort-down': currentSortBy === sortBy && sortOrder === 'DESC',
          })}
        />
      </span>
    </SearchLink>
  );
};
