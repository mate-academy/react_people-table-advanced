import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

export const TableHeader = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortTypes = ['Name', 'Sex', 'Born', 'Died'];

  const handleOrderSort = (sortType: string) => {
    if (order === 'desc') {
      return { sort: null, order: null };
    } else {
      return { sort: sortType, order: sort && !order ? 'desc' : null };
    }
  };

  return (
    <tr>
      {sortTypes.map(type => (
        <th key={sortTypes.indexOf(type)}>
          <span className="is-flex is-flex-wrap-nowrap">
            {type}
            <SearchLink params={handleOrderSort(type.toLowerCase())}>
              <span className="icon">
                <i
                  className={classNames('fas', {
                    'fa-sort': !sort || sort !== type.toLowerCase(),
                    'fa-sort-up': sort === type.toLowerCase() && !order,
                    'fa-sort-down': sort === type.toLowerCase() && order,
                  })}
                />
              </span>
            </SearchLink>
          </span>
        </th>
      ))}

      <th>Mother</th>
      <th>Father</th>
    </tr>
  );
};
