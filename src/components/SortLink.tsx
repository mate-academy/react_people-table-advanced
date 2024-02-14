/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface SortLinkProps {
  field: string,
  onSort: () => void;
}

export const SortLink: React.FC<SortLinkProps> = ({ field, onSort }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const params = {
    sort: (field === sortField && isReversed) ? null : field,
    order: (field === sortField && !isReversed) ? 'desc' : null,
  };

  return (
    <SearchLink params={params}>
      <span
        className="icon"
        onClick={() => {
          onSort();
        }}
      >
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
