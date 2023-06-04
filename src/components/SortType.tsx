import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface SortProps {
  sortBy: string,
}

export const SortType: React.FC<SortProps> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();
  const typeSort = searchParams.get('sort');
  const reversal = searchParams.get('order') === 'desc';

  const type = {
    sort: (sortBy === typeSort && reversal)
      ? null
      : sortBy,
    order: (sortBy === typeSort && !reversal)
      ? 'desc'
      : null,
  };

  return (
    <SearchLink params={type}>
      <span>
        <i className={classNames(
          'fas',
          {
            'fa-sort': sortBy !== typeSort,
            'fa-sort-up': sortBy === typeSort && !reversal,
            'fa-sort-down': sortBy === typeSort && reversal,
          },
        )}
        />
      </span>
    </SearchLink>
  );
};
