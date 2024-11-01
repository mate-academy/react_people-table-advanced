import { Link, useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
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
