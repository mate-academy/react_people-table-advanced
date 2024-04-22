/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  personId: string;
  getFather: (name: string | null) => Person | undefined;
  getMother: (name: string | null) => Person | undefined;
};

export const PeopleTable: React.FC<Props> = ({
  person,
  personId,
  getFather,
  getMother,
}) => {
  const { motherName, fatherName, sex, born, died } = person;

  const isSelected = (human: Person) => human.slug === personId;

  const mother = getMother(motherName);
  const father = getFather(fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected(person),
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          <span>{motherName || '-'}</span>
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          <span>{fatherName || '-'}</span>
        )}
      </td>
    </tr>
  );
};
