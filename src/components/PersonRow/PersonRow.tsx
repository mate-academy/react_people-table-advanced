import React from 'react';
import { PersonName } from '../PersonName';

import { PersonData, Person } from '../../utils/type';
import './PersonRow.scss';

export const PersonRow: React.FC <PersonData<Person, number, string>> = ({
  person, index, people,
}) => {
  const mother: Person | undefined = people.find(individ => person.motherName === individ.name);
  const father: Person | undefined = people.find(individ => person.fatherName === individ.name);

  return (
    <>
      <td>{index}</td>
      <PersonName
        human={person.name}
        slug={person.slug}
        people={people}
      />
      <td>
        {person.sex}
      </td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {mother ? (
        <PersonName
          human={person.motherName}
          slug={mother.slug}
          people={people}
        />
      ) : (
        <td>
          <strong>{person.motherName}</strong>
        </td>
      )}
      {father ? (
        <PersonName
          human={person.fatherName}
          slug={father.slug}
          people={people}
        />
      ) : (
        <td>
          <strong>{person.fatherName}</strong>
        </td>
      )}
    </>
  );
};
