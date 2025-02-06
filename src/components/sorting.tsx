import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {};

export const Sorting: React.FC<Props> = () => {
  const sortFields = ['Name', 'Sex', 'Born', 'Died'];
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sortFunction = (sortValue: string) => {
    if (sortValue !== sort) {
      return {
        sort: sortValue,
        order: null,
      };
    }

    if (sortValue === sort && !order) {
      return {
        sort: sortValue,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <tr>
      {sortFields.map(sortField => {
        const lowerSortField = sortField.toLowerCase();

        return (
          <th key={sortField}>
            <span className="is-flex is-flex-wrap-nowrap">
              {sortField}
              <SearchLink params={sortFunction(lowerSortField)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sort === lowerSortField && !order,
                      'fa-sort-down': sort === lowerSortField && order,
                      'fa-sort': sort !== lowerSortField,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
        );
      })}
      <th>Mother</th>
      <th>Father</th>
    </tr>
  );
};
