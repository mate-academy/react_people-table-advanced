import { Link, useLocation } from 'react-router-dom';
import type { Person } from '../types/Person';

export const PersonLink = ({ person }: { person: Person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
