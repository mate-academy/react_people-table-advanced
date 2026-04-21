import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export default function PersonLink({
  person,
  name,
}: {
  person: Person | undefined;
  name: string | null;
}) {
  const [searchParams] = useSearchParams();

  if (!name) {
    return <span>-</span>;
  }

  if (!person) {
    return <span>{name}</span>;
  } else {
    return (
      <Link
        className={person.sex === 'f' ? 'has-text-danger' : ''}
        to={{
          pathname: `/people/${person.slug}`,
          search: searchParams.toString(),
        }}
      >
        {name}
      </Link>
    );
  }
}
