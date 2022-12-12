import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SortBy } from '../types/SortBy';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  sortedBy: SortBy;
  sorting: string | '',
  order: string | '',
};

export const PeopleSort: React.FC<Props> = ({ sortedBy, sorting, order }) => {
  const [searchParams] = useSearchParams();

  const orderNo = sorting === sortedBy && !order;
  const orderWith = sorting === sortedBy && order;
  const title = sortedBy.charAt(0).toUpperCase() + sortedBy.slice(1);

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title}
      <Link
        to={{
          search: getSearchWith(searchParams, {
            sort: orderWith ? null : sortedBy,
            order: orderNo ? 'desc' : null,
          }),
        }}
      >
        <span className="icon">
          <i
            className={classNames(
              'fas fa-sort',
              { 'fa-sort-up': orderNo },
              { 'fa-sort-down': orderWith },
            )}
          />
        </span>
      </Link>
    </span>
  );
};
