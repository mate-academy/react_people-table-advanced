import React from 'react';
import { Person } from '../../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person,
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  return (
    <>
      <th>
        <PersonLink person={person} />
      </th>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <th>
        {person.mother
          ? (<PersonLink person={person.mother} />)
          : (person.motherName)}
      </th>
      <th>
        {person.father
          ? (<PersonLink person={person.father} />)
          : (person.fatherName)}
      </th>
    </>
  );
};
