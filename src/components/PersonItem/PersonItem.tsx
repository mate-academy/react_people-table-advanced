import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person
  selectedPerson: string | undefined
};

export const PersonItem: React.FC<Props> = ({ person, selectedPerson }) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {person.mother ? (
        <td>
          <PersonLink person={person.mother} />
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {person.father ? (
        <td>
          <PersonLink person={person.father} />
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}

    </tr>
  );
};
