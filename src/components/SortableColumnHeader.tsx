import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { Sort } from '../types/Sort';

type Props = {
  label: string;
  sortBy: string;
};

export const SortableColumnHeader = ({ label, sortBy }: Props) => {
  const [searchParams] = useSearchParams();

  const isCurrentColumn = searchParams.get('sort') === sortBy;
  const isDescending = searchParams.get('order') === 'desc';

  const sort = !isCurrentColumn ? Sort.no : isDescending ? Sort.down : Sort.up;

  const getURLLink = (): SearchParams => {
    if (!isCurrentColumn) {
      return { sort: sortBy, order: null };
    }

    if (!isDescending) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {label}
      <SearchLink params={getURLLink()}>
        <span className="icon">
          <i className={`fas ${sort}`} />
        </span>
      </SearchLink>
    </span>
  );
};
