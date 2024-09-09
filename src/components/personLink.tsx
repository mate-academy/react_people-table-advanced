import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  return (
    <td>
      <Link
        to={`./${person.slug}`}
        className={cn({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    </td>
  );
};
