import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const SORT_FIELDS = ['name', 'sex', 'born', 'died'];

export const TableHead = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function setSort(keySort: string) {
    if (sort !== keySort) {
      return { sort: keySort, order: null };
    }

    if (!order) {
      return { sort, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  return (
    <tr>
      {SORT_FIELDS.map(field => {
        const fieldName = field[0].toUpperCase() + field.slice(1);
        const fieldClassName = classNames(
          'fas',
          { 'fa-sort': sort !== field },
          { 'fa-sort-up': sort === field && !order },
          { 'fa-sort-down': sort === field && order },
        );

        return (
          <th key={field}>
            <span className="is-flex is-flex-wrap-nowrap">
              {fieldName}
              <SearchLink params={setSort(field)}>
                <span className="icon">
                  <i className={fieldClassName} />
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
