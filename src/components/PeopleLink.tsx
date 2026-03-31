/* eslint-disable prettier/prettier */
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
