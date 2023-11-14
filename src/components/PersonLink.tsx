import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
