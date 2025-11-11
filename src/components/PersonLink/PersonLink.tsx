import React from 'react';
import { Person } from '../../types';
import { Link, useSearchParams } from 'react-router-dom';

interface Props {
  name: string | null;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ name, people }) => {
  const [searchParams] = useSearchParams();

  if (!name) {
    return <>-</>;
  }

  const person = people.find(per => per.name === name);

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
