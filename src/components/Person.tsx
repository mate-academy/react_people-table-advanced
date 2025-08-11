import React from 'react';
import { Person as PersonType } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

interface Props {
  person: PersonType;
}
export const Person: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, mother, father } = person;
  const fName = fatherName || '-';
  const mName = motherName || '-';
  const { slug } = useParams();
  const className = slug === person.slug ? 'has-background-warning' : '';

  return (
    <tr data-cy="person" className={`${className}`}>
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>{mother ? <PersonLink person={mother} /> : mName}</td>

      <td>{father ? <PersonLink person={father} /> : fName}</td>
    </tr>
  );
};
