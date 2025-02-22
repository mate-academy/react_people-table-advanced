import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  field: string;
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  let params: Record<string, string | null> = {
    sort: field,
    order: 'asc',
  };

  if (field === sortField) {
    if (isReversed) {
      params = {
        sort: null,
        order: null,
      };
    } else {
      params.order = 'desc';
    }
  }

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortField !== field,
            'fa-sort-up': sortField === field && !isReversed,
            'fa-sort-down': sortField === field && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
