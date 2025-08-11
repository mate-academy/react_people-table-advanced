import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person | null;
}

export const PersonLink = ({ person }: Props) => {
  const location = useLocation();

  if (!person) {
    return <span>-</span>;
  }

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search: location.search }}
      data-cy="personLink"
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
