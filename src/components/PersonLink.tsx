import { Link, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const [searchParams] = useSearchParams();

  const search = searchParams.toString();

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search: search ? `?${search}` : '',
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
