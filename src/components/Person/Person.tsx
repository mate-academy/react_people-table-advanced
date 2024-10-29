import { Person as IPerson } from '../../types';
import React from 'react';
import cn from 'classnames';
import { NavLink, useParams } from 'react-router-dom';

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
        <NavLink
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {person.mother ? (
        <td>
          <NavLink
            to={`/people/${person.mother.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </NavLink>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {person.father ? (
        <td>
          <NavLink to={`/people/${person.father.slug}`}>
            {person.father.name}
          </NavLink>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
