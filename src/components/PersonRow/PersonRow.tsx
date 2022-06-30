import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonName } from '../PersonName/PersonName';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const mother = people.find(el => el.name === person.motherName);
  const father = people.find(el => el.name === person.fatherName);

  return (
    <tr style={{
      backgroundColor: slug === person.slug ? '#bbff8f' : '',
    }}
    >
      <PersonName
        person={person}
      />
      <td>
        {person.sex}
      </td>
      <td>
        {person.born}
      </td>
      <td>
        {person.died}
      </td>
      {mother ? (
        <PersonName
          person={mother}
        />
      ) : (
        <td
          style={{
            fontWeight: 'bold',
          }}
        >
          {person.motherName}
        </td>
      )}
      {father ? (
        <PersonName
          person={father}
        />
      ) : (
        <td
          style={{
            fontWeight: 'bold',
          }}
        >
          {person.fatherName}
        </td>
      )}
    </tr>
  );
};
