import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person) => void;
};

export const PersonInfo: React.FC<Props> = ({
  person,
  people,
  selectedPerson,
  setSelectedPerson,
}) => {
  const { name, sex, born, died, fatherName, motherName } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person,
      })}
    >
      <td>
        <PersonLink
          name={name}
          people={people}
          setSelectedPerson={setSelectedPerson}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          <PersonLink
            name={motherName}
            people={people}
            setSelectedPerson={setSelectedPerson}
          />
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherName ? (
          <PersonLink
            name={fatherName}
            people={people}
            setSelectedPerson={setSelectedPerson}
          />
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
