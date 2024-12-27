import React from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  isSelected: boolean;
  findPersonByName: (name: string | undefined) => Person | undefined;
};

export const PersonDetails: React.FC<Props> = ({
  person,
  isSelected,
  findPersonByName,
}) => {
  const { slug, sex, born, died, motherName, fatherName } = person;

  const mother = motherName ? findPersonByName(motherName) : undefined;
  const father = fatherName ? findPersonByName(fatherName) : undefined;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          mother ? (
            <PersonLink person={mother} />
          ) : (
            motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherName ? (
          father ? (
            <PersonLink person={father} />
          ) : (
            fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
