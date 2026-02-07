import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};
export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const isActive = person.slug === slug ? 'has-background-warning' : '';
  const mother = people.find(per => per.name === person.motherName);
  const father = people.find(per => per.name === person.fatherName);

  return (
    <tr data-cy="person" className={isActive}>
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {!person.motherName && '-'}
        {person.motherName && !mother && person.motherName}
        {mother && <PersonLink person={mother} />}
      </td>
      <td>
        {!person.fatherName && '-'}
        {person.fatherName && !father && person.fatherName}
        {father && <PersonLink person={father} />}
      </td>
    </tr>
  );
};
