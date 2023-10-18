import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SortBy } from '../types';

type Props = {
  sortBy: SortBy;
};

export const Sort = ({ sortBy }: Props) => {
  const [searchParams] = useSearchParams();

  const getSearchParams = () => {
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
    <SearchLink params={getSearchParams()}>
      <span className="icon">
        <i className="fas fa-sort" />
      </span>
    </SearchLink>
  );
};
