import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person | null;
  name?: string;
}

export const PersonLink = ({ person, name }: Props) => {
  const [searchParams] = useSearchParams();
  const searchString = searchParams.toString();

  if (!person) {
    return <span>{name || '-'}</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: searchString,
      }}
      className={className}
    >
      {person.name}
    </Link>
  );
};
