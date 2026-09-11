import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | null;
  name: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  const location = useLocation();

  if (person === null) {
    return <>{name}</>;
  }

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
