import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from '../SearchLink';
import type { SortHeader } from '../../types/Sort';

type Props = {
  sortHeader: SortHeader;
};

export const PeopleTableSortHeader = ({ sortHeader }: Props) => {
  const [searchParams] = useSearchParams();

  const getSortParams = (sortBy: string) => {
    if (searchParams.get('sort') !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (searchParams.get('order') !== 'desc') {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {sortHeader.text}
        <SearchLink params={getSortParams(sortHeader.name)}>
          <span className="icon">
            <i
              className={cn('fas', {
                'fa-sort':
                  searchParams.get('sort') === null ||
                  searchParams.get('sort') !== sortHeader.name,
                'fa-sort-up':
                  searchParams.get('sort') === sortHeader.name &&
                  searchParams.get('order') === null,
                'fa-sort-down':
                  searchParams.get('sort') === sortHeader.name &&
                  searchParams.get('order') !== null,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
