import classNames from 'classnames';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';

// enum Sort {
//   ascending = 'asc',
//   descending = 'desc',
//   default = 'default',
// }

/* eslint-disable jsx-a11y/control-has-associated-label */
interface PeopleTableProps {
  people: Person[];
  filteredPeople: Person[];
  currentPerson: string | undefined;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  filteredPeople,
  currentPerson,
}) => {
  const { search } = useLocation();

  // const [sortOrder, setSortOrder] = useState<Sort>(Sort.default);

  // const toggleSortOrder = () => {
  //   setSortOrder(prevOrder =>
  //     prevOrder === Sort.default
  //       ? Sort.ascending
  //       : prevOrder === Sort.ascending
  //         ? Sort.descending
  //         : Sort.default,
  //   );
  // };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const mother = people.find(
            personToFind => person.motherName === personToFind.name,
          );

          const father = people.find(
            personToFind => person.fatherName === personToFind.name,
          );

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': currentPerson === person.slug,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person?.slug}`,
                    search: search,
                  }}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                  replace={true}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother?.slug}`,
                      search: search,
                    }}
                    className={classNames({
                      'has-text-danger': mother.sex === 'f',
                    })}
                  >
                    {person.motherName}
                  </Link>
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father?.slug}`,
                      search: search,
                    }}
                  >
                    {person.fatherName}
                  </Link>
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
