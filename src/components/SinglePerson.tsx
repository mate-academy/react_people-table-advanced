import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const SinglePerson: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const selectedPerson = people.find(identity => slug === identity.slug);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPerson?.slug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {!person.mother ? (
          `${person.motherName}`
        ) : (
          <PersonLink person={person.mother} />
        )}
      </td>

      <td>
        {!person.father ? (
          `${person.fatherName}`
        ) : (
          <PersonLink person={person.father} />
        )}
      </td>
    </tr>
  );
};
