import { Link, useParams } from 'react-router-dom';
import { usePeople } from '../store/PeopleContext';
import { Person } from '../types';
import classNames from 'classnames';
import { useFilters } from '../store/FilterContext';

/* eslint-disable jsx-a11y/control-has-associated-label */

function isPersonFemale(person: Person | undefined): boolean {
  return person?.sex === 'f';
}

function findPersonByName(
  people: Person[],
  name: string | null,
): Person | undefined {
  return people.find(person => person.name === name);
}

export const PeopleTable = () => {
  const { filteredPeople } = usePeople();
  const { slug } = useParams();
  const selectedPerson = slug || 'notSelected';
  const { getNextSortOrder, getSearchWith, searchParams, sort, order } =
    useFilters();
  const sortField = ['name', 'sex', 'born', 'died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortField.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {/* Capitalize column name */}
                <Link
                  to={{
                    search: getSearchWith(
                      getNextSortOrder(sort, order, field),
                      searchParams,
                    ),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== field,
                        'fa-sort-up': sort === field && order === 'asc',
                        'fa-sort-down': sort === field && order === 'desc',
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const mother = findPersonByName(filteredPeople, person.motherName);
          const father = findPersonByName(filteredPeople, person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames('', {
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
                {mother ? (
                  <Link
                    to={`/people/${mother.slug}`}
                    className={classNames({
                      'has-text-danger': isPersonFemale(mother),
                    })}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || ' - '
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={`/people/${father.slug}`}
                    className={classNames({
                      'has-text-danger': isPersonFemale(father),
                    })}
                  >
                    {father.name}
                  </Link>
                ) : (
                  person.fatherName || ' - '
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
