// PersonLink.tsx
import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person: Person;
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, people }) => {
  const { name, sex, born, died, fatherName, motherName } = person;
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const mother = person.motherName
    ? people.find(p => p.name === motherName) || null
    : null;
  const father = person.fatherName
    ? people.find(p => p.name === fatherName) || null
    : null;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td aria-label="Name">
        <Link
          to={{ pathname: `../${person.slug}`, search: location.search }}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={{ pathname: `../${mother.slug}`, search: location.search }}
            className={mother.sex === 'f' ? 'has-text-danger' : ''}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={{ pathname: `../${father.slug}`, search: location.search }}>
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
