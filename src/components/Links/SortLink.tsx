import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { FilterType } from '../../types/FilterType';

type Props = {
  sortFilter: string,
};

export const SortLink: React.FC<Props> = ({ sortFilter }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(FilterType.SORT) || null;
  const order = searchParams.get(FilterType.ORDER) || null;

  return (
    <SearchLink params={{
      sort: sort === sortFilter && order ? null : sortFilter,
      order: sort === sortFilter && !order ? 'desc' : null,
    }}
    >
      <span className="icon">
        <i className={classNames(
          'fas',
          { 'fa-sort': sort !== sortFilter },
          { 'fa-sort-up': sort === sortFilter && !order },
          { 'fa-sort-down': sort === sortFilter && order },
        )}
        />
      </span>
    </SearchLink>
  );
};
