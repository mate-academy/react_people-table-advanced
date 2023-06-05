import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { findParent } from '../utils/ParentLink';
import { SearchLink } from './SearchLink';

export type Props = {
  people: Person[],
  selectedPerson: string,
  sort: string,
  order: string,
};
const searchColumnParams = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson = '',
  sort,
  order = 'asc',
}) => {
  const getSortParams = (searchColumn: string) => {
    if (searchColumn === sort) {
      if (order === 'asc') {
        return { sort: searchColumn, order: 'desc' };
      }

      return { sort: null, order: null };
    }

    return { sort: searchColumn, order: 'asc' };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {searchColumnParams.map((searchColumn: string) => {
            const formattedColumn = searchColumn.toLowerCase();

            return (
              <th key={searchColumn}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {searchColumn}
                  <SearchLink params={getSortParams(formattedColumn)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== formattedColumn,
                          'fa-sort-up': sort === formattedColumn && !order,
                          'fa-sort-down': sort === formattedColumn && order,
                        })}
                      />
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
        {people.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson === person.slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {findParent(people, person.motherName)}
              </td>

              <td>
                {findParent(people, person.fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
