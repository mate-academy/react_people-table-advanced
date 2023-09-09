import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const TableHead = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function setSort(keySort: string) {
    const sortParams = { sort, order };

    if (sort !== keySort) {
      sortParams.sort = keySort;
      sortParams.order = null;
    } else if (!order) {
      sortParams.order = 'desc';
    } else {
      sortParams.sort = null;
      sortParams.order = null;
    }

    return sortParams;
  }

  return (
    <tr>
      {['name', 'sex', 'born', 'died'].map(field => {
        const fieldName = field[0].toUpperCase() + field.slice(1);
        const sortParams = setSort(field);
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
              <SearchLink params={sortParams}>
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
