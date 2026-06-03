import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { PeopleTableRow } from '../PeopleTableRow';
import { Person } from '../../types';
import { SORTING_COLUMNS } from '../../constants/sortingColumns';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortConfig = (column: string) => {
    if (sort !== column) {
      return { params: { sort: column, order: null }, icon: 'fa-sort' };
    }

    if (!order) {
      return { params: { sort: column, order: 'desc' }, icon: 'fa-sort-up' };
    }

    return { params: { sort: null, order: null }, icon: 'fa-sort-down' };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORTING_COLUMNS.map(column => {
            const { params, icon } = getSortConfig(column.field);

            return (
              <th key={column.field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column.label}
                  <SearchLink params={params}>
                    <span className="icon">
                      <i className={classNames('fas', icon)} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleTableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
