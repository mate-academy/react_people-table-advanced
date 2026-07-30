import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonTR: React.FC<Props> = React.memo(({ person, people }) => {
  const { userSlug } = useParams<{ userSlug: string }>();
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const resolvedMother = mother || people.find(p => p.name === motherName);
  const resolvedFather = father || people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={userSlug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} name={name} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          <PersonLink person={resolvedMother} name={motherName} />
        ) : (
          '-'
        )}
      </td>

      <td>
        {fatherName ? (
          <PersonLink person={resolvedFather} name={fatherName} />
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
});

PersonTR.displayName = 'PersonTR';
