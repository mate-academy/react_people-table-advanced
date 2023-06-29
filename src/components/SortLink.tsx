import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  field: string,
};

export const SortLink: React.FC<Props> = ({ field }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  return (
    <SearchLink
      params={{
        sort: (sort === field && isReversed) ? null : field,
        order: (sort === field && !isReversed) ? 'desc' : null,
      }}
    >
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sort !== field,
            'fa-sort-up': sort === field && !isReversed,
            'fa-sort-down': sort === field && isReversed,
          })}
        />
      </span>
    </SearchLink>
  );
};
