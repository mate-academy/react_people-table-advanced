import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  sortBy: string;
};

export const SortLink: React.FC<Props> = ({ sortBy }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort' || '');
  const desc = searchParams.get('order') === 'desc';

  const params = {
    sort: sortBy === sortField && desc ? null : sortBy,
    order: sortBy === sortField && !desc ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': sortField !== sortBy,
            'fa-sort-up': sortField === sortBy && !desc,
            'fa-sort-down': sortField === sortBy && desc,
          })}
        />
      </span>
    </SearchLink>
  );
};
