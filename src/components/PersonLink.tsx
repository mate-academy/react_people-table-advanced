import React from 'react';
import { Person } from '../types';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

interface PersonLinkProps {
  person: Person;
  names: string[];
  people: Person[];
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  names,
  people,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleMotherClick = () => {
    if (person.motherName && names.includes(person.motherName)) {
      const neededPerson = people.find(pers => pers.name === person.motherName);

      return neededPerson?.slug + '?' + params.toString();
    }

    return;
  };

  const handleFatherClick = () => {
    if (person.fatherName && names.includes(person.fatherName)) {
      const neededPerson = people.find(pers => pers.name === person.fatherName);

      return neededPerson?.slug + '?' + params.toString();
    }

    return;
  };

  return (
    <tr
      className={classNames({
        'has-background-warning':
          location.pathname === '/people/' + person.slug,
      })}
      data-cy="person"
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.motherName && names.includes(person.motherName) ? (
        <td>
          <Link
            className="has-text-danger"
            to={`/people/${handleMotherClick()}`}
          >
            {person.motherName || '-'}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {person.fatherName && names.includes(person.fatherName) ? (
        <td>
          <Link to={`/people/${handleFatherClick()}`}>
            {person.fatherName || '-'}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
