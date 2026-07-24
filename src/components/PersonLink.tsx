import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type PersonProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonProps) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
