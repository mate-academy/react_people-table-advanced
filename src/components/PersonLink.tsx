import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();
  const isWomen = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}?${searchParams}`}
      className={isWomen ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
