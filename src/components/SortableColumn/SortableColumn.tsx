import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

type SortField = 'born' | 'died' | 'name' | 'sex';

interface SortableColumnProps {
  label: string;
  field: SortField;
}

export const SortableColumn = ({ label, field }: SortableColumnProps) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function getSortParams() {
    if (sort === field && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sort === field) {
      return { sort: field, order: 'desc' };
    }

    return { sort: field, order: null };
  }

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <SearchLink params={getSortParams()}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': sort !== field,
                'fa-sort-up': sort === field && order !== 'desc',
                'fa-sort-down': sort === field && order === 'desc',
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
