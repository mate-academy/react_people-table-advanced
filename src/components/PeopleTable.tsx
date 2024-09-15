import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import {
  FieldsToSort,
  FieldToSortKey,
  FieldToSortSearchQuery,
  SearchParams,
} from '../types';

export const PeopleTable = ({ children }: React.PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortSearchParams = searchParams.get(SearchParams.sort);
  const orderSearchParams = searchParams.get(SearchParams.order);

  const fieldsToSort = Object.entries(FieldsToSort) as [
    FieldToSortKey,
    FieldToSortSearchQuery,
  ][];

  const handleSort = (sortField?: FieldToSortSearchQuery) => {
    const params = new URLSearchParams(searchParams);
    const clearAllSortParams = () => {
      params.delete(SearchParams.sort);
      params.delete(SearchParams.order);
    };

    if (orderSearchParams && sortField === sortSearchParams) {
      clearAllSortParams();
      setSearchParams(params);

      return;
    }

    if (!orderSearchParams && sortSearchParams === sortField) {
      params.set(SearchParams.order, 'desc');
      setSearchParams(params);

      return;
    }

    if (sortField) {
      clearAllSortParams();
      params.set(SearchParams.sort, sortField);
      setSearchParams(params);

      return;
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
        {fieldsToSort.map(([fieldName, fieldSearchQuery]) => (
            <th key={fieldName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {fieldName}
                <a onClick={() => handleSort(fieldSearchQuery)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sortSearchParams !== fieldSearchQuery,
                        'fa-sort-down':
                          orderSearchParams &&
                          sortSearchParams === fieldSearchQuery,
                        'fa-sort-up':
                          sortSearchParams === fieldSearchQuery &&
                          !orderSearchParams,
                      })}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
