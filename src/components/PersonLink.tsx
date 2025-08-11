import cn from 'classnames';
import { useSearchParams, Link } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink = ({ person }: { person: Person }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchParams.toString(),
      }}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
