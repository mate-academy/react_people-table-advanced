import cn from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={`../${person.slug + search}`}
    >
      {person.name}
    </Link>
  );
};
