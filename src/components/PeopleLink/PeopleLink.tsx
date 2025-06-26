import cn from 'classnames';
import { Person } from '../../types';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PeopleLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`../${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
