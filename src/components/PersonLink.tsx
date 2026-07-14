// .. PersonLink.tsx
import { Link, useSearchParams } from 'react-router-dom';
import type { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink = ({ person }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(), // зберігає всі фільтри (?sex=m&query=...)
      }}
    >
      {person.name}
    </Link>
  );
};
