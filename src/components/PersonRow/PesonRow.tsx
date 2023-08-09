import React from 'react';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person,
  selectedPerson?: string,
};

export const PesonRow: React.FC<Props> = ({ person, selectedPerson }) => {
  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': selectedPerson === person.slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? (<PersonLink person={person.mother} />)
          : person.motherName || '-'}
      </td>
      <td>
        {person.father
          ? (<PersonLink person={person.father} />)
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
