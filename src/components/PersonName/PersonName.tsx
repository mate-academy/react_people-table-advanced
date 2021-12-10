import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { PersonFull } from '../../services/types';

interface Props {
  person: PersonFull;
}

export const PersonName: FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={`/people/${person.slug}${location.search}`}
      className={cn({
        'has-text-blue': person.sex === 'm',
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
