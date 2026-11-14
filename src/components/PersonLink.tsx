import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import type { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
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
