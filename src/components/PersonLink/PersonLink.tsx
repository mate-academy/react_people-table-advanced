import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import React from 'react';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        personSlug === person.slug ? 'has-background-warning' : '',
      )}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames(person.sex === 'f' ? 'has-text-danger' : '')}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.mother === undefined ? (
        <td>{person.motherName || '-'}</td>
      ) : (
        <td>
          <Link
            to={`/people/${person.mother.slug}`}
            className={classNames(
              person.mother.sex === 'f' ? 'has-text-danger' : '',
            )}
          >
            {person.mother.name}
          </Link>
        </td>
      )}

      {person.father === undefined ? (
        <td>{person.fatherName || '-'}</td>
      ) : (
        <td>
          <Link to={`/people/${person.father.slug}`}>{person.father.name}</Link>
        </td>
      )}
    </tr>
  );
};
