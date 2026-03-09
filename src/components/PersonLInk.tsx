import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(), // ← зберігає всі поточні params
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
