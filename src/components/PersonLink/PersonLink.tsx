import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={person.slug}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
