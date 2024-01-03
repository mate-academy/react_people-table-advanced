import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const mother = people.find(possibleMother => (
    possibleMother.name === person.motherName
  )) || null;
  const father = people.find(possibleFather => (
    possibleFather.name === person.fatherName
  )) || null;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink
          person={person}
          aria-label={
            `Link to ${person.name}'s profile`
          }
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother && (
          <PersonLink person={mother} />
        )}

        {!mother && (person.motherName ?? '-')}
      </td>
      <td>
        {father && <PersonLink person={father} />}

        {!father && (person.fatherName ?? '-')}
      </td>
    </tr>
  );
};
