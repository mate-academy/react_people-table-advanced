import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

const SORT_DESC = 'desc';

const sortedFields = ['Name', 'Sex', 'Born', 'Died'];

enum SearchParamsNames {
  Sort = 'sort',
  Order = 'order',
}

const getSortLink = (field: string, search: URLSearchParams): SearchParams => {
  const sort = field.toLocaleLowerCase();
  const sortField = search.get(SearchParamsNames.Sort) ?? '';
  const order = search.get(SearchParamsNames.Order) ?? '';

  if (sortField !== sort) {
    return { sort, order: null };
  }

  if (order === '') {
    return { sort, order: SORT_DESC };
  }

  return { sort: null, order: null };
};

export const PeopleTableHeader = () => {
  const [search] = useSearchParams();

  const getSortClass = (field: string) => {
    const sortField = search.get(SearchParamsNames.Sort);
    const order = search.get(SearchParamsNames.Order);

    if (field.toLowerCase() !== sortField) {
      return 'fa-sort';
    }

    return order === SORT_DESC ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <thead>
      <tr>
        {sortedFields.map(field => (
          <th key={field}>
            <span className="is-flex is-flex-wrap-nowrap">
              {field}
              <SearchLink params={getSortLink(field, search)}>
                <span className="icon">
                  <i className={classNames('fas', getSortClass(field))} />
                </span>
              </SearchLink>
            </span>
          </th>
        ))}
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
