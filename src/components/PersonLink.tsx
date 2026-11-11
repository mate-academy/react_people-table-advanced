import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const location = useLocation();

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={{
        pathname: `/people/${person.slug}`,
        search: location.search,
      }}
    >
      {person.name}
    </Link>
  );
};
