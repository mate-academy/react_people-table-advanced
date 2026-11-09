import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

function PersonLink({ person }: Props) {
  const location = useLocation();
  const path = `/people/${person.slug}${location.search}`;

  return (
    <Link
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
      to={path}
    >
      {person.name}
    </Link>
  );
}

export default PersonLink;
