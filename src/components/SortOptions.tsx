import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type SortOptionsProps = {
  field: string;
  label: string;
  sortFilter: string | null;
  orderFilter: string | null;
};

export const SortOptions: React.FC<SortOptionsProps> = (
  {
    field, label, sortFilter, orderFilter,
  },
) => {
  const handleSortFilter = (param: string) => {

    if (sortFilter === null && orderFilter === null) {
      return param;
    }

    if (sortFilter === param && orderFilter === null) {
      return param;
    }

    return null;
  };

  const handleOrderFilter = (param: string) => {
    if (sortFilter === null && orderFilter === null) {
      return null;
    }

    if (sortFilter === param && orderFilter === null) {
      return 'desc';
    }

    return null;
  };

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <SearchLink
          params={{
            sort: handleSortFilter(field),
            order: handleOrderFilter(field),
          }}
        >
          <span className="icon">
            <i
              className={classNames('fas fa-sort', {
                'fa-sort-up': orderFilter === 'desc' && sortFilter === field,
              })}
            />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};
