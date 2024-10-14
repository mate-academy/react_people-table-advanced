import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();

  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={{
        pathname: `/people/${person.slug}`,
        search,
      }}
    >
      {person.name}
    </Link>
  );
};
