import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const [searchParams] = useSearchParams();

  function getLink(slug: string) {
    return {
      pathname: `/people${slug ? `/${slug}` : ''}`,
      search: searchParams.toString(),
    };
  }

  return (
    <Link
      to={getLink(person.slug)}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
