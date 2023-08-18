import React from 'react';
import { useParams } from 'react-router-dom';
import { Person as PersonType } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: PersonType;
};

export const Person: React.FC<Props> = ({
  person,
}) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={slug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <PersonLink person={person.mother} />
        ) : (
          <p>{person.motherName ? person.motherName : '-'}</p>
        )}
      </td>
      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        ) : (
          <p>{person.fatherName ? person.fatherName : '-'}</p>
        )}
      </td>
    </tr>
  );
};
