import { Link, useSearchParams } from 'react-router-dom';
import type { Person } from '../types/Person';

type Props = {
  person?: Person;
  name?: string;
  people?: Person[];
};

export const PersonLink = ({ person, name, people }: Props) => {
  const [searchParams] = useSearchParams();

  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';

  if (person) {
    return (
      <Link
        to={`/people/${person.slug}${search}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  const found = people?.find(
    p => p.name.toLowerCase().trim() === name?.toLowerCase().trim(),
  );

  if (!found) {
    return <span>{name ?? ''}</span>;
  }

  return (
    <Link
      to={`/people/${found.slug}${search}`}
      className={found.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
