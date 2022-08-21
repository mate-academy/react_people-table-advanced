import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonName: FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;
  const { search } = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: `${search}`,
      }}
      style={sex === 'f'
        ? { color: 'rgb(255, 0, 0)' }
        : { color: 'rgb(0, 71, 171)' }}
    >
      {name}
    </Link>
  );
};
