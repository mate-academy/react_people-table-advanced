import React from 'react';
import { PersonLinkProps } from '../types/PersonLinkProps';
import { Link, useSearchParams } from 'react-router-dom';

const PersonLink: React.FC<PersonLinkProps> = ({ personName, peopleMap }) => {
  const [searchParams] = useSearchParams();

  if (!personName || !peopleMap.has(personName)) {
    return <>{personName || '-'}</>;
  }

  const person = peopleMap.get(personName);

  if (!person) {
    return <>{personName || 'Unknown'}</>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      data-cy="personLink"
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
