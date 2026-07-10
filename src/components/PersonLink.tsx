import React from 'react';
import { Person } from '../types';
import { NavLink } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const makeTextRed = (checkPerson: Person): string => {
    if (checkPerson.sex === 'f') {
      return 'has-text-danger';
    }

    return '';
  };

  return (
    <NavLink className={makeTextRed(person)} to={`/people/${person.slug}`}>
      {person.name}
    </NavLink>
  );
};
