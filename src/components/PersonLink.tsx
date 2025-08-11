import React from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

interface PersonLinkProps {
  person: Person;
}
export function PersonLink({ person }: PersonLinkProps) {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={`${person.sex === 'm' ? '' : 'has-text-danger'}`}
      to={{
        pathname: `/people/${person.slug}`,
        search: getSearchWith(searchParams, {}),
      }}
    >
      {person.name}
    </Link>
  );
}
