import React from 'react';
import { Person } from '../types';
import { Link, useLocation, useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const location = useLocation();

  const motherIsActive =
    person.motherName && people.some(p => p.name === person.motherName);

  const fatherIsActive =
    person.fatherName && people.some(p => p.name === person.fatherName);

  const mother: '' | Person | null | undefined =
    person.motherName && people.find(p => p.name === person.motherName);

  const father: '' | Person | null | undefined =
    person.fatherName && people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={slug === person?.slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          // to={`/people/${person.slug}`}
          to={{
            pathname: `/people/${person.slug}`,
            search: location.search,
          }}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {!motherIsActive ? (
          person.motherName || '-'
        ) : (
          <Link
            className={motherIsActive ? 'has-text-danger' : ''}
            to={`/people/${mother?.slug}`}
          >
            {person.motherName}
          </Link>
        )}
      </td>

      <td>
        {!fatherIsActive ? (
          person.fatherName || '-'
        ) : (
          <Link to={`/people/${father?.slug}`}>{person.fatherName}</Link>
        )}
      </td>
    </tr>
  );
};
