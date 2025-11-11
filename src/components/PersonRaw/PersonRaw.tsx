import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

interface PersonRawProps {
  person: Person;
}

export const PersonRaw: React.FC<PersonRawProps> = ({ person }) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        <PersonLink person={person.mother} name={person.motherName} />
      </td>

      <td>
        <PersonLink person={person.father} name={person.fatherName} />
      </td>
    </tr>
  );
};
