// .. PersonLink.tsx
import { Link, useSearchParams } from 'react-router-dom';
import type { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink = ({ person }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  const searchString = getSearchWith(searchParams, {});

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}${searchString}`}
    >
      {person.name}
    </Link>
  );
};
