import React from 'react';
import { Person } from '../types';
import { NavLink } from 'react-router-dom';

interface Props {
  person: Person;
  i: number;
  selectedSlug: string | undefined;
  people: Person[] | undefined;
}

export const Personn: React.FC<Props> = ({
  person,
  i,
  selectedSlug,
  people,
}) => {
  let mother: Person | undefined;
  let father: Person | undefined;

  if (people !== undefined) {
    mother = people.find(p => p.name === person.motherName);
    father = people.find(p => p.name === person.fatherName);
  }

  return (
    <tr
      data-cy="person"
      key={i}
      className={person.slug === selectedSlug ? 'has-background-warning' : ''}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          mother ? (
            <NavLink to={`/people/${mother.slug}`} className="has-text-danger">
              {mother.name}
            </NavLink>
          ) : (
            <span>{person.motherName}</span>
          )
        ) : (
          <span>-</span>
        )}
      </td>
      <td>
        {person.fatherName ? (
          father ? (
            <NavLink to={`/people/${father.slug}`} className="has-text-link">
              {father.name}
            </NavLink>
          ) : (
            <span>{person.fatherName}</span>
          )
        ) : (
          <span>-</span>
        )}
      </td>
    </tr>
  );
};
