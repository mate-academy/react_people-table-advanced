import { FC } from 'react';
import { Person } from '../types';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  name: string | null;
  people: Person[];
};

export const PersonLink: FC<Props> = ({ name, people }) => {
  const { search } = useLocation();

  if (!name) {
    return <span>-</span>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
