import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person?: Person;
  name?: string | null;
}

export const PersonLink = ({ person, name }: PersonLinkProps) => {
  const [searchParam] = useSearchParams();

  if (person) {
    return (
      <Link
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParam.toString(),
        }}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  if (name) {
    return <>{name}</>;
  }

  return <>-</>;
};
