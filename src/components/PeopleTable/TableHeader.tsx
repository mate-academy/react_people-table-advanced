import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

const sortTypes = ['name', 'sex', 'born', 'died'];

export const TableHeader = () => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const linkClass = (param: string) =>
    cn(
      'fas',
      { 'fa-sort': sort !== param },
      { 'fa-sort-up': sort === param && !order },
      { 'fa-sort-down': sort === param && order === 'desc' },
    );

  const linkParam = (param: string) => {
    return {
      sort: param,
      order: sort === param ? (order === 'desc' ? null : 'desc') : null,
      ...(sort === param && order === 'desc'
        ? { sort: null, order: null }
        : {}),
    };
  };

  return (
    <tr>
      {sortTypes.map(sortType => (
        <th key={sortType}>
          <span className="is-flex is-flex-wrap-nowrap">
            {sortType.charAt(0).toUpperCase() + sortType.slice(1)}
            <SearchLink params={linkParam(sortType)}>
              <span className="icon">
                <i className={linkClass(sortType)} />
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
