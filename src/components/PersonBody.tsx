import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
  chosenId?: string;
}

export const PersonBody: React.FC<Props> = ({ person, chosenId }) => {
  const { sex, slug, born, died, motherName, fatherName, mother, father } =
    person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': chosenId === slug })}
    >
      <td>{<PersonLink person={person} />}</td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
