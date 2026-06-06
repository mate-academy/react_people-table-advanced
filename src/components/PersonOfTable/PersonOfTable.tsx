import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

interface Props {
  person: Person;
  selected: Person | undefined;
}

export const PersonOfTable: React.FC<Props> = ({ person, selected }) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selected?.slug === person.slug,
      })}
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
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
