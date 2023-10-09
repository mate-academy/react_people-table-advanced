import { useSearchParams } from 'react-router-dom';
import { PeopleList } from '../PeopleList';
import { SearchLink } from '../SearchLink';
import { ESortBy } from '../../types';

const tableHeaders: ESortBy[]
  = [ESortBy.Name, ESortBy.Sex, ESortBy.Born, ESortBy.Died];

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') ?? '';
  const orderParam = searchParams.get('order') ?? '';

  const getSortStyleLink = (param: string) => {
    if (sortParam === param && orderParam) {
      return 'fa-sort-down';
    }

    if (sortParam === param) {
      return 'fa-sort-up';
    }

    return 'fa-sort';
  };

  const sortBy = (sortField: ESortBy) => {
    if (sortParam !== sortField) {
      return { sort: sortField, order: null };
    }

    if (!orderParam) {
      return { sort: sortField, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map((columnName) => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {columnName.toCapitalize()}
                <SearchLink
                  params={sortBy(columnName)}
                >
                  <span className="icon">
                    <i className={`fas ${getSortStyleLink(columnName)}`} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        <PeopleList />
      </tbody>
    </table>
  );
};
