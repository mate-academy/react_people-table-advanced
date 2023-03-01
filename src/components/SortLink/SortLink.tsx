import classNames from 'classnames';
import { LinkProps, useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/SortBy';
import { SearchLink } from '../SearchLink';

type Props = Omit<LinkProps, 'to'> & {
  sort: SortBy,
};

interface SortParams {
  sort: string | null;
  order: string | null;
}

const newParams: SortParams = {
  sort: null,
  order: null,
};

export const SortLink: React.FC<Props> = ({ sort }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentSortOrder = searchParams.get('order') || '';

  const isSortByTheSame = currentSort === sort;

  if (isSortByTheSame && !currentSortOrder) {
    newParams.sort = sort;
    newParams.order = 'desc';
  } else if (!isSortByTheSame) {
    newParams.sort = sort;
  }

  return (
    <SearchLink
      params={{ ...newParams }}
    >
      <span className="icon">
        <i className={classNames('fas',
          {
            'fa-sort': !isSortByTheSame,
            'fa-sort-up': isSortByTheSame && !currentSortOrder,
            'fa-sort-down': isSortByTheSame && currentSortOrder,
          })}
        />
      </span>
    </SearchLink>
  );
};
