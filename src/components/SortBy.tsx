import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

type SortByProps = {
  sort: string;
};

export const SortBy: React.FC<SortByProps> = ({ sort }) => {
  const [searchParams] = useSearchParams();

  type Params = {
    sort: string | null
    order: string | null
  };

  let params: Params = {
    sort: null,
    order: null,
  };

  if (searchParams.get('sort') !== sort) {
    params = {
      ...params,
      sort,
    };
  } else if (searchParams.get('sort') === sort
  && searchParams.get('order') === null) {
    params = {
      sort,
      order: 'desc',
    };
  }

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i className={cn('fas', {
          'fa-sort': searchParams.get('sort') !== sort,
          'fa-sort-up': searchParams.get('sort') === sort
          && !searchParams.get('order'),
          'fa-sort-down': searchParams.get('sort') === sort
          && searchParams.get('order'),
        })}
        />
      </span>
    </SearchLink>
  );
};
