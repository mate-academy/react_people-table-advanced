import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

type OrderControlProps = {
  sortBy: string;
};

export const OrderControl = ({ sortBy }: OrderControlProps) => {
  const [searchParams] = useSearchParams();

  const getSearchParms = () => {
    const sortOrder = searchParams.get('sortOrder');
    const currentSortBy = searchParams.get('sortBy');

    let nextSortOrder = null;

    if (!sortBy || !sortOrder || currentSortBy !== sortBy) {
      nextSortOrder = 'ASC';
    } else if (sortOrder === 'ASC') {
      nextSortOrder = 'DESC';
    }

    return { sortBy: nextSortOrder ? sortBy : null, sortOrder: nextSortOrder };
  };

  return (
    <SearchLink params={getSearchParms()}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort': (searchParams.get('sortOrder') === null),
            'fa-sort-up': (searchParams.get('sortOrder') === 'ASC')
              && (searchParams.get('sortBy') === sortBy),
            'fa-sort-down': (searchParams.get('sortOrder') === 'DESC')
              && (searchParams.get('sortBy') === sortBy),
          })}
        />
        {' '}
      </span>
    </SearchLink>
  );
};
