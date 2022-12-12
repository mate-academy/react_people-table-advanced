import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/SortBy';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  title: SortBy,
};

export const SortLink: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const sortingParams = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const noOrder = sortingParams === title && !sortOrder;
  const withOrder = sortingParams === title && sortOrder;

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title.slice(0, 1).toUpperCase() + title.slice(1)}
      <Link
        to={{
          search: getSearchWith(searchParams, {
            sort: withOrder
              ? null
              : title,
            order: noOrder
              ? 'desc'
              : null,
          }),
        }}
      >
        <span className="icon">
          <i className={classNames(
            'fas fa-sort',
            { 'fa-sort-up': noOrder },
            { 'fa-sort-down': withOrder },
          )}
          />
        </span>
      </Link>
    </span>
  );
};
