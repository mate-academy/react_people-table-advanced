import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SortParam } from '../../types/SortParam';
import { SearchLink } from '../SearchLink';

interface Props {
  sortType: SortParam,
}

export const SortLink: React.FC<Props> = ({ sortType }) => {
  const [searchParams] = useSearchParams();
  const isReversed = searchParams.get('order') === 'desc';
  const sortField = searchParams.get('sort') || SortParam.NoSort;

  const isSortAsc = sortType === sortField && !isReversed;
  const isSortDesc = sortType === sortField && isReversed;
  const isUnsorted = sortField !== sortType;

  const params = {
    order: isSortAsc ? 'desc' : null,
    sort: isSortDesc ? null : sortType,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i
          className={classNames(
            'fas',
            {
              'fa-sort': isUnsorted,
              'fa-sort-up': isSortAsc,
              'fa-sort-down': isSortDesc,
            },
          )}
        />
      </span>
    </SearchLink>
  );
};
