import React from 'react';
// Components
import { PersonName } from '../PesonName';
// Types
import { Person } from '../../types/Person/Person';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    mother,
    father,
  } = person;

  return (
    <>
      <td className="PeopleTable__Item">
        <PersonName person={person} />
      </td>
      <td className="PeopleTable__Item">{sex}</td>
      <td className="PeopleTable__Item">{born}</td>
      <td className="PeopleTable__Item">{died}</td>
      <td className="PeopleTable__Item">
        {mother ? (
          <PersonName person={mother} />
        ) : (
          person.motherName || 'Unknown'
        )}
      </td>
      <td className="PeopleTable__Item">
        {father ? (
          <PersonName person={father} />
        ) : (
          person.fatherName || 'Unknown'
        )}
      </td>
    </>
  );
};
