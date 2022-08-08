import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  field: string,
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const params = {
    sort: (field === sortField && isReversed) ? null : field,
    order: (field === sortField && !isReversed) ? 'desc' : null,
  };

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
