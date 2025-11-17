import React from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  name: string | null;
  peopleMap: Map<string, Person>;
};

export const PersonLink: React.FC<Props> = ({ name, peopleMap }) => {
  const [searchParams] = useSearchParams();

  if (!name) {
    return <>-</>;
  }

  const person = peopleMap.get(name);

  if (!person) {
    return <>{name}</>;
  }

  const linkClass = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: `?${searchParams.toString()}`,
      }}
      className={linkClass}
    >
      {person.name}
    </Link>
  );
};
