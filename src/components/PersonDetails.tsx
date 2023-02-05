import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  personMother: Person | undefined;
  personFather: Person | undefined;
  isSelected: (person: Person) => boolean,
};

export const PersonDetails: React.FC<Props> = ({
  person,
  personMother,
  personFather,
  isSelected,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
  } = person;

  return (
    <tr
      data-cy="person"
      key={name}
      className={classNames(
        {
          'has-background-warning': isSelected(person),
        },
      )}
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>

        {
          personMother
            ? (
              <PersonLink person={personMother} />
            ) : (
              motherName || '-'
            )
        }
      </td>
      <td>
        {
          personFather
            ? (
              <PersonLink person={personFather} />
            ) : (
              fatherName || '-'
            )
        }
      </td>
    </tr>
  );
};
