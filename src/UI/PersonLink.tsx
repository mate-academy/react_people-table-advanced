import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  person: Person;
  seacrh: string;
}

export const PersonLink: React.FC<Props> = ({ person, seacrh }) => {
  return (
    <Link
      to={{
        pathname: `../${person.slug}`,
        search: seacrh,
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
