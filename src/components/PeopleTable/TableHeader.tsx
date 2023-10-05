import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

export const TableHeader = () => {
  const [searchParams] = useSearchParams();
  const params = {
    sort: searchParams.get('sort'),
    order: searchParams.get('order'),
  };

  const onSortItems = (param: string) => (params.order === null ? param : null);
  const onOrderItems = (param: string) => ((params.sort === param
    && params.order === null) ? 'desc' : null);

  const sortFields = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <thead>
      <tr>
        {sortFields.map((fieldName:string) => (
          <th key={fieldName}>
            <span className="is-flex is-flex-wrap-nowrap">
              {fieldName}
              <SearchLink
                params={{
                  sort: onSortItems(fieldName.toLowerCase()),
                  order: onOrderItems(fieldName.toLowerCase()),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': params.sort !== fieldName.toLowerCase(),
                    'fa-sort-down': params.order === 'desc'
                    && params.sort === fieldName.toLowerCase(),
                    'fa-sort-up': params.order !== 'desc'
                    && params.sort === fieldName.toLowerCase(),
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
    </thead>
  );
};
