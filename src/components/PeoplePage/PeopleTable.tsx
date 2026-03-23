import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonItem } from './PersonItem';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';

export const PeopleTable: React.FC<{ peoples: Person[] }> = ({ peoples }) => {
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(field => {
            const fieldValue = field.toLowerCase();
            const isSorted = searchParams.has('sort', fieldValue);
            const isOrderedSort = searchParams.has('order');

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field}
                  <Link
                    to={{
                      pathname: '/people',
                      search: getSearchWith(searchParams, {
                        sort: isSorted && isOrderedSort ? null : fieldValue,
                        order: isSorted && !isOrderedSort ? 'desc' : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': !isSorted,
                          'fa-sort-up': isSorted && !isOrderedSort,
                          'fa-sort-down': searchParams.has('order', 'desc'),
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(person => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
