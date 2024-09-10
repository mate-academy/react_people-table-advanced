import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <td>
      <Link
        to={`./${person.slug}?${searchParams.toString()}`}
        className={cn({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    </td>
  );
};
