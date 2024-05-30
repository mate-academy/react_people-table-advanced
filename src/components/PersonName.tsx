import { Link, useSearchParams } from 'react-router-dom';

import { FC } from 'react';
import { Person } from '../types';

interface Props {
  name: string;
  person?: Person;
}

const PersonName: FC<Props> = ({ name, person }) => {
  const [searchParams] = useSearchParams();

  if (!person) {
    return <>{name}</>;
  }

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
};

export default PersonName;
