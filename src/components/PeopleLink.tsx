import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import React from 'react';

type Props = { person?: Person | null; name?: string | null };

export const PeopleLink: React.FC<Props> = ({ person, name }) => {
  const [searchParams] = useSearchParams();

  if (person) {
    return (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {name}
      </Link>
    );
  }

  return <span>{name}</span>;
};
