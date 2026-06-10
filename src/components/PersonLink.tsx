import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person?: Person;
  fallback?: string;
}

export const PersonLink = ({ person, fallback }: Props) => {
  if (!person) {
    return <>{fallback}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
