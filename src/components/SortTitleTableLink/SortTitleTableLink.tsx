import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  name: string;
};

export const SortTitleTableLink: React.FC<Props> = ({ name }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const titleSort = name.toLowerCase();
  const sortOrder = sort === titleSort && !order;
  const sortOrderDesc = sort === titleSort && order === 'desc';

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {name}
        <SearchLink
          params={{
            sort: sortOrderDesc
              ? null
              : titleSort,
            order: sortOrder
              ? 'desc'
              : null,
          }}
        >
          <span className="icon">
            <i className={classNames(
              'fas fa-sort',
              { 'fa-sort-up': sortOrder },
              { 'fa-sort-down': sortOrderDesc },
            )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
