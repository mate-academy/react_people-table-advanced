import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { SORT_DESC } from '../../constants';

const sortedFields = ['Name', 'Sex', 'Born', 'Died'];

const getSortLink = (field: string, search: URLSearchParams): SearchParams => {
  const sort = field.toLocaleLowerCase();
  const prevField = search.get('sort') ?? '';
  const order = search.get('order') ?? '';

  if (prevField !== field.toLocaleLowerCase()) {
    return {
      sort,
      order: null,
    };
  }

  if (order === '') {
    return { sort, order: SORT_DESC };
  }

  return { sort: null, order: null };
};

export const PeopleTableHeader = () => {
  //  const { search } = useLocation();
  const [search] = useSearchParams();

  return (
    <thead>
      <tr>
        <>
          {sortedFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field}
                <Link
                  to={{
                    search: getSearchWith(search, getSortLink(field, search)),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort':
                          field.toLocaleLowerCase() !== search.get('sort'),
                        'fa-sort-up':
                          field.toLocaleLowerCase() === search.get('sort') &&
                          search.get('order') !== SORT_DESC,
                        'fa-sort-down':
                          field.toLocaleLowerCase() === search.get('sort') &&
                          search.get('order') === SORT_DESC,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}
        </>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
