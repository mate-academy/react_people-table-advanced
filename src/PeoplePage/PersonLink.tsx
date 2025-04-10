import { FC } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      to={`/people/${person.slug}${search}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
