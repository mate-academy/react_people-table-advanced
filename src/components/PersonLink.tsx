import type { Person } from '../types/Person';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
