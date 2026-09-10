import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
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
