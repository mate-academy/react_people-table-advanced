import { Person as IPerson } from '../../types';
import React from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';

interface Props {
  person: IPerson;
}

export const Person: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === person.slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {person.mother ? (
        <td>
          <Link
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {person.father ? (
        <td>
          <Link to={`/people/${person.father.slug}`}>{person.father.name}</Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
