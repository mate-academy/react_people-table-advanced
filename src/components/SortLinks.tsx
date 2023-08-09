import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SortParameters } from '../types';

type Props = {
  sortField: string,
  field: string,
  order: string,
};

export const SortLinks: React.FC<Props> = ({
  sortField,
  field,
  order,
}) => {
  const [searchParams] = useSearchParams();

  const handleSort = (param: SortParameters) => {
    if (sortField === param && !order) {
      return getSearchWith(searchParams,
        { sort: param, order: 'desc' });
    }

    if (sortField === param && order) {
      return getSearchWith(searchParams,
        { sort: null, order: null });
    }

    return getSearchWith(searchParams,
      { sort: param, order: null });
  };

  return (
    <Link
      to={{
        search: handleSort(field.toLowerCase() as SortParameters),
      }}
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
