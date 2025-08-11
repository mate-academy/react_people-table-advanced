import React from 'react';
import { Person } from '../types';
import { Link, NavLink } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
  isSelected?: boolean | null;
};

export const PersonLink: React.FC<Props> = ({ person, people, isSelected }) => {
  const renderPersonName = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const foundPerson = people.find(per => per.name === name);

    return foundPerson ? (
      <NavLink
        to={`/people/${foundPerson.slug}`}
        className={foundPerson.sex === 'f' ? 'has-text-danger' : ''}
      >
        {name}
      </NavLink>
    ) : (
      name
    );
  };

  return (
    <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
      <td>
        <Link
          to={`${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderPersonName(person.motherName)}</td>
      <td>{renderPersonName(person.fatherName)}</td>
    </tr>
  );
};
