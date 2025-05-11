import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParams } from '../../utils/searchHelper';
import { SORT_DESC } from '../../constants';
import { SearchLink } from '../SearchLink';
import { SearchParamsFields } from '../../types/SearchParamsFields';

const sortedFields = ['Name', 'Sex', 'Born', 'Died'];

const getSortLink = (field: string, search: URLSearchParams): SearchParams => {
  const sort = field.toLocaleLowerCase();
  const sortField = search.get(SearchParamsFields.Sort) ?? '';
  const order = search.get(SearchParamsFields.Order) ?? '';

  if (sortField !== field.toLocaleLowerCase()) {
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
  const [search] = useSearchParams();
  const getSortClass = (field: string) => {
    if (field.toLocaleLowerCase() !== search.get(SearchParamsFields.Sort)) {
      return 'fa-sort';
    }

    if (
      field.toLocaleLowerCase() === search.get(SearchParamsFields.Sort) &&
      search.get('order') !== SORT_DESC
    ) {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  return (
    <thead>
      <tr>
        <>
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
        </>
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
