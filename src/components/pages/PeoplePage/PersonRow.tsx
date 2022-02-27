import React from 'react';
import { usePeople } from '../../hooks/usePeople';
import { PersonName } from './PersonName';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { people } = usePeople();
  const mother = people.find(mom => mom.name === person.motherName);
  const father = people.find(dad => dad.name === person.fatherName);

  return (
    <>
      <td>
        <PersonName person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <PersonName person={mother} />
        ) : (
          person.motherName || 'unknown'
        )}
      </td>
      <td>
        {father ? (
          <PersonName person={father} />
        ) : (
          person.fatherName || 'unknown'
        )}
      </td>
    </>
  );
};
