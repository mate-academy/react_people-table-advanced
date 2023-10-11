import { Link, useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/SortBy';

export const PeopleSort = () => {
  const [searchParams] = useSearchParams();
  const oldSort = searchParams.get('sort');
  const oldOrder = searchParams.get('order');

  const setIconClass = (columnName: SortBy): string => {
    if (columnName === oldSort && !oldOrder) {
      return 'fas fa-sort-up';
    }

    if (columnName === oldSort && oldOrder) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  const addSortToUrlParams = (sort: SortBy): URLSearchParams => {
    const params = new URLSearchParams(searchParams);

    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }

    if (sort === oldSort && !oldOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('order');
    }

    if (sort === oldSort && oldOrder) {
      params.delete('sort');
      params.delete('order');
    }

    // switch (sort) {
    //   case sort:
    //     params.delete('sort');
    //     break;
    //   case oldSort:
    //     !oldOrder
    //       ? params.set('order', 'desc')
    //       : params.delete('order');
    //     break;

    //   default:
    //     params.set('sort', sort);
    // }

    return params;
  };

  return (
    <tr>
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Name
          <Link
            to={{
              pathname: '',
              search: addSortToUrlParams(SortBy.Name).toString(),
            }}
          >
            <span className="icon">
              <i className={setIconClass(SortBy.Name)} />
            </span>
          </Link>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Sex
          <Link
            to={{
              pathname: '',
              search: addSortToUrlParams(SortBy.Sex).toString(),
            }}
          >
            <span className="icon">
              <i className={setIconClass(SortBy.Sex)} />
            </span>
          </Link>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Born
          <Link
            to={{
              pathname: '',
              search: addSortToUrlParams(SortBy.Born).toString(),
            }}
          >
            <span className="icon">
              <i className={setIconClass(SortBy.Born)} />
            </span>
          </Link>
        </span>
      </th>

      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          Died
          <Link
            to={{
              pathname: '',
              search: addSortToUrlParams(SortBy.Died).toString(),
            }}
          >
            <span className="icon">
              <i className={setIconClass(SortBy.Died)} />
            </span>
          </Link>
        </span>
      </th>

      <th>Mother</th>
      <th>Father</th>
    </tr>
  );
};
