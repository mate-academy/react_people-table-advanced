import cn from 'classnames';

import { SearchLink } from '../SearchLink';
import { SortParam, useSortLink } from './useSortLink';

interface Props {
  sortValue: string;
}

export const SortLink: React.FC<Props> = ({ sortValue }) => {
  const {
    currentParams: { sort, order },
    getNewSearchParams,
  } = useSortLink();

  const paramCandidate = sortValue.toLocaleLowerCase();
  const newSearchParams = getNewSearchParams(paramCandidate as SortParam);

  return (
    <SearchLink params={newSearchParams}>
      <span className="icon">
        <i
          className={cn('fas', {
            'fa-sort': sort !== paramCandidate,
            'fa-sort-up': sort === paramCandidate && !order,
            'fa-sort-down': sort === paramCandidate && order,
          })}
        />
      </span>
    </SearchLink>
  );
};
