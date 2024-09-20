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
          findPersonByName(motherName) ? (
            <PersonLink person={findPersonByName(motherName)} />
          ) : (
            motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherName ? (
          findPersonByName(fatherName) ? (
            <PersonLink person={findPersonByName(fatherName)} />
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
