/* eslint-disable import/extensions */
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';

import classNames from 'classnames';
import { PeopleTableHeader } from './PeopleTableHeader';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

const sortPeople = (
  people: Person[],
  sortBy: string | null,
  order: string | null,
) => {
  if (!sortBy) {
    return people;
  }

  return [...people].sort((a, b) => {
    let aValue = a[sortBy as keyof Person];
    let bValue = b[sortBy as keyof Person];

    if (aValue === null || aValue === undefined) {
      aValue = '';
    }

    if (bValue === null || bValue === undefined) {
      bValue = '';
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }

    if (aValue < bValue) {
      return order === 'desc' ? 1 : -1;
    }

    if (aValue > bValue) {
      return order === 'desc' ? -1 : 1;
    }

    return 0;
  });
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const { search } = useLocation();
  const { personSlug } = useParams();

  const sortedPeople = sortPeople(people, sort, order);

  const findInList = (name: string) => {
    return people.find(per => per.name === name);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeader />
      <tbody>
        {sortedPeople.map(person => {
          const mother = findInList(person.motherName || '');
          const father = findInList(person.fatherName || '');

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <Link
                  to={{ pathname: `/people/${person.slug}`, search }}
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
                {person.motherName ? (
                  mother ? (
                    <Link
                      className="has-text-danger"
                      to={{ pathname: `/people/${mother.slug}`, search }}
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <Link to={{ pathname: `/people/${father.slug}`, search }}>
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
                  )
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
