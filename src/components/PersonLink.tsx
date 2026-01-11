import { Link } from 'react-router-dom';
import { Person } from '../types';
import { getPersonSlug } from '../utils/PersonSlug';
import React from 'react';

type Props = {
  person?: Person;
  name?: string | null;
  people?: Person[];
  searchParams?: URLSearchParams;
};

export const PersonLink: React.FC<Props> = ({
  person,
  name,
  people = [],
  searchParams,
}) => {
  if (!person && !name) {
    return <>-</>;
  }

  const targetPerson = person ?? people.find(p => p.name === name);

  if (!targetPerson) {
    return <>{name}</>;
  }

  const slug = getPersonSlug(targetPerson);

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams?.toString(),
      }}
      className={targetPerson.sex === 'f' ? 'has-text-danger' : ''}
    >
      {targetPerson.name}
    </Link>
  );
};
