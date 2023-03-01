import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  title: string;
};

export const TableHeadLink: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') || '';
  const isSortReversed = searchParams.get('order') === 'desc';
  const isReversed = sortColumn === title && isSortReversed;
  const isAsc = sortColumn === title && !isSortReversed;

  return (
    <SearchLink
      params={{
        sort: isReversed ? null : title,
        order: isAsc ? 'desc' : null,
      }}
    >
      <span className="icon">
        <i
          className={classNames(
            'fas', {
              'fa-sort': sortColumn !== title,
              'fa-sort-up': isAsc,
              'fa-sort-down': isReversed,
            },
          )}
        />
      </span>
    </SearchLink>
  );
};
