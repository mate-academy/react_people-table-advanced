import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type Props = {
  text: string,
};

export const TableHeadLink: React.FC<Props> = ({ text }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sortBy = text.toLowerCase();
  const sortOrderDESC = sort === sortBy && order === 'desc';
  const withoutSortOrder = sort === sortBy && !order;

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {text}
        <SearchLink
          params={{
            sort: sortOrderDESC
              ? null
              : sortBy,
            order: withoutSortOrder
              ? 'desc'
              : null,
          }}
        >
          <span className="icon">
            <i className={classNames(
              'fa fa-sort',
              { 'fa-sort-up': withoutSortOrder },
              { 'fa-sort-down': sortOrderDESC },
            )}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
