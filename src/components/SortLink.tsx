import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SortBy } from '../types/SortBy';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  sortField: string,
  field: string,
  order: string,
};

export const SortLink: React.FC<Props> = ({
  sortField,
  field,
  order,
}) => {
  const [searchParams] = useSearchParams();

  const onHandleSort = (param: SortBy) => {
    if (sortField === param && !order) {
      return getSearchWith(searchParams, { sort: param, order: 'desc' });
    }

    if (sortField === param && order) {
      return getSearchWith(searchParams, { sort: param, order: null });
    }

    return getSearchWith(searchParams, { sort: param, order: null });
  };

  return (
    <Link
      to={{ search: onHandleSort(field.toLowerCase() as SortBy) }}
    >
      <span className="icon">
        <i className={classNames({
          'fas fa-sort': sortField !== field.toLowerCase(),
          'fas fa-sort-up': sortField === field.toLowerCase() && !order,
          'fas fa-sort-down': sortField === field.toLowerCase() && order,
        })}
        />
      </span>
    </Link>
  );
};
