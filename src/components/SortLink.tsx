import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { PersonSort } from '../types';

type Props = {
  sort: PersonSort;
};

export const SortLink: React.FC<Props> = ({
  sort,
}) => {
  const [searchParams] = useSearchParams();
  const isDesc = searchParams.get('order') === 'desc';
  const sortField = searchParams.get('sort') || '';
  let iconFaSort = '';

  const params: SearchParams = ((): SearchParams => {
    if (sortField !== sort) {
      iconFaSort = 'fa-sort';

      return {
        sort,
        order: null,
      };
    }

    if (sortField === sort && !isDesc) {
      iconFaSort = 'fa-sort-up';

      return {
        sort,
        order: 'desc',
      };
    }

    iconFaSort = 'fa-sort-down';

    return {
      sort: null,
      order: null,
    };
  })();

  return (
    <SearchLink
      params={params}
    >
      <span className="icon">
        <i className={cn('fas', iconFaSort)} />
      </span>
    </SearchLink>
  );
};
