/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people, allPeople, selectedSlug }: Props) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: SortField) => {
    if (sort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (order !== 'desc') {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const findPerson = (name: string | null) =>
    allPeople.find(person => person.name === name);

  const getPersonLink = (person: Person) => ({
    pathname: `/people/${person.slug}`,
    search: searchParams.toString(),
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(['name', 'sex', 'born', 'died'] as SortField[]).map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field[0].toUpperCase() + field.slice(1)}

                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={getSortIcon(field)} />
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
        {people.map(person => {
          const mother = findPerson(person.motherName);
          const father = findPerson(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <Link
                  to={getPersonLink(person)}
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
                    to={getPersonLink(mother)}
                    className={classNames({
                      'has-text-danger': mother.sex === 'f',
                    })}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={getPersonLink(father)}
                    className={classNames({
                      'has-text-danger': father.sex === 'f',
                    })}
                  >
                    {father.name}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
