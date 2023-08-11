import classNames from 'classnames';
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  onFindPerson: (name: string) => Person | undefined,
};
export const PeopleLink: React.FC<Props> = ({ person, onFindPerson }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const mother = person.motherName ? onFindPerson(person.motherName) : null;
  const father = person.fatherName ? onFindPerson(person.fatherName) : null;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `../${person.slug}`,
            search: searchParams.toString(),
          }}
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
            className="has-text-danger"
            to={{
              pathname: `../${
                mother.slug || ''
              }`,
              search: searchParams.toString(),
            }}
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={{
              pathname: `../${
                father.slug || ''
              }`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
