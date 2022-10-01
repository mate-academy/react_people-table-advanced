import cn from 'classnames';
import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = memo(({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={`/people/${person.slug}${location.search}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
});
