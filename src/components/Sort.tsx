import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type SortProps = {
  sortBy:string;
};

export const Sort = ({ sortBy }: SortProps) => {
  const [searchParams] = useSearchParams();
  const currentSortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('sortOrder');

  const getSearchParams = () => {
    let nextSortOrder: string | null = 'ASC';

    if (currentSortBy === sortBy) {
      nextSortOrder = sortOrder === 'ASC' ? 'DESC' : null;
    }

    return {
      sort: nextSortOrder === null ? null : sortBy,
      sortOrder: nextSortOrder,
    };
  };

  return (
    <SearchLink params={getSearchParams()}>
      <span className="icon">
        <i
          className={classNames('fas fa-sort', {
            'fa-sort-up': currentSortBy === sortBy && sortOrder === 'ASC',
            'fa-sort-down': currentSortBy === sortBy && sortOrder === 'DESC',
          })}
        />
      </span>
    </SearchLink>
  );
};
